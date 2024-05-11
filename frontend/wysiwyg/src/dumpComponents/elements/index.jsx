import React, { useState, useContext } from "react";
import { set, get } from "lodash";
import { pageDesignContext } from "../../lib/context/";

export function HtmlElement() {
  const pageDesignState = useContext(pageDesignContext);
  const htmlElems = [
    {
      previmg: "/assets/images/elements/html/paragraph.png",
      elid: "paragraph",
      inHTML: "Type your content here...",
      desc: "Paragraph",
      elementType: "paragraph",
      classList: "",
      attributes: {},
      elemType: "p",
      styles: { color: "#000000" },
      elemEditable: true,
      enableDropping: false,
      elements: [],
    },
    {
      previmg: "/assets/images/elements/html/button.png",
      elid: "button",
      inHTML: "Type your content here...",
      desc: "Button",
      elementType: "button",
      classList: "",
      attributes: {},
      elemType: "a",
      styles: {
        backgroundColor: "#0d6efd",
        display: "inline-block",
        color: "#ffffff",
        padding: "5px 10px",
        borderRadius: "10px",
        boxShadow: "3px 3px 5px rgba(0,0,0,.1), -3px -3px 5px rgba(0,0,0,.1)",
      },
      elemEditable: true,
      enableDropping: false,
      elements: [],
    },
    {
      previmg: "/assets/images/elements/html/image.png",
      elid: "image",
      inHTML: "",
      desc: "Image",
      attributes: {
        src: "/assets/images/elements/html/dummyImage.jpg",
        width: "500px",
        height: "auto",
        alt: "Demo Preview Image",
      },
      elementType: "Image",
      classList: "",
      styles: {},
      elemType: "img",
      elemEditable: false,
      enableDropping: false,
      elements: [],
    },

    {
      previmg: "/assets/images/elements/html/iframe.png",
      elid: "iframe",
      inHTML: "",
      desc: "Inline Frame",
      attributes: {
        src: "https://example.com",
        width: "100%",
        height: "300px",
        allowtransparency: "true",
      },
      elementType: "Iframe",
      classList: "",
      styles: { padding: "5px" },
      elemType: "iframe",
      elemEditable: false,
      enableDropping: false,
      elements: [],
    },
  ];

  const [htmlElem, setHtmlElem] = useState(htmlElems);

  const AddSubElement = (elNode, index) => {
    elNode = elNode.substr(0, [elNode.length - 1]).split(",");
    let _depth = { ...pageDesignState.design };
    let tempOpt = [...htmlElem];
    let _earlier_options = get(
      _depth,
      "elements[" + elNode.join("].elements[") + "]",
    );

    if (!_earlier_options.enableDropping) {
      elNode = elNode.slice(0, -1);
      if (elNode.length > 0) {
        _earlier_options = get(
          _depth,
          "elements[" + elNode.join("].elements[") + "].elements",
        );
        _depth = set(
          _depth,
          "elements[" + elNode.join("].elements[") + "].elements",
          [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))],
        );
      } else {
        _earlier_options = get(_depth, "elements");
        _depth = set(_depth, "elements", [
          ..._earlier_options,
          JSON.parse(JSON.stringify(tempOpt[index])),
        ]);
      }
    } else {
      _earlier_options = _earlier_options.elements;
      _depth = set(
        _depth,
        "elements[" + elNode.join("].elements[") + "].elements",
        [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))],
      );
    }

    pageDesignState.setDesign(_depth);
  };

  const AddDroppedElement = (e) => {
    if (pageDesignState.design.isDropEnabled) {
      if (pageDesignState.nodeLevel.current === null) {
        let _elems = [];
        let tempOptions = [];
        tempOptions = [...htmlElem];
        _elems = [...pageDesignState.design.elements];
        _elems.splice(
          pageDesignState.dropPosition.current,
          0,
          JSON.parse(
            JSON.stringify(
              tempOptions[
                e.target.closest(".item_drag").getAttribute("data-elementindex")
              ],
            ),
          ),
        );
        pageDesignState.setDesign({
          ...pageDesignState.design,
          elements: _elems,
        });
        pageDesignState.dropPosition.current = null;
      } else {
        if (pageDesignState.nodeLevel.current) {
          AddSubElement(
            pageDesignState.nodeLevel.current,
            e.target.closest(".item_drag").getAttribute("data-elementindex"),
          );

          pageDesignState.nodeLevel.current = null;
        }
      }
    }
  };

  return htmlElem.length > 0 ? (
    <div className="htmlElemGrid">
      {htmlElem.map((e, i) => {
        return (
          <div
            data-elementindex={i}
            className="item_drag half"
            draggable
            key={e.elid}
            onDoubleClick={AddDroppedElement}
            onDragEnd={AddDroppedElement}
          >
            <img src={e.previmg} />
            <p>{e.desc}</p>
          </div>
        );
      })}
    </div>
  ) : (
    ""
  );
}
