import React, { useRef, useContext, useEffect } from "react";
import { pageDesignContext, userDetailsContext } from "../../Context/contexts";
import { useNavigate, useMatch, Link } from "react-router-dom";
import { useUser } from "../../lib/utils/";

export default function Navbar() {
  const navigate = useNavigate();

  const parentDropDownSlide = useRef(null);
  const dropdownSlide = useRef(null);
  const selectPageList = useRef(null);

  const pageDesignState = useContext(pageDesignContext);
  const UserDetailsState = useContext(userDetailsContext);

  const isPageDesign = useMatch("/designer/:projectId/:pageId");
  const isPageDesignEmpty = useMatch("/designer/:projectId/:pageId");

  const isUser = useUser();

  useEffect(() => {}, [pageDesignState.webDesignState]);

  const currentActiveMenu = (e) => {
    let elpos = +e.target.closest("li").getAttribute("data-elementId");
    let allListEl =
      parentDropDownSlide.current.querySelectorAll("li[data-elementid]");

    if (elpos - 2 > -1) {
      allListEl[elpos - 2].querySelector("ul").style.transform =
        `translateX(${allListEl[elpos - 2].getBoundingClientRect().width}px) `;
      allListEl[elpos - 2].querySelector("ul").style.scale = 0;
    }

    if (elpos < allListEl.length) {
      allListEl[elpos].querySelector("ul").style.transform =
        `translateX(-${allListEl[elpos].getBoundingClientRect().width}px) `;
      allListEl[elpos].querySelector("ul").style.scale = 0;
    }

    let el = e.target.closest("li").querySelector("ul");
    if (el) {
      el.style.transform = `translateX(0px) rotateY(0deg)`;
      el.style.scale = 1;
    }

    let ht = e.target.closest("li").getAttribute("data-dropheight");
    dropdownSlide.current.style.transform = `translateX(${e.target.getBoundingClientRect().x - parentDropDownSlide.current.getBoundingClientRect().x - 10}px)`;
    dropdownSlide.current.style.height = ht + "px";
  };

  const elementLeaveRemove = (e) => {
    let el = e.target.closest("li").querySelector("ul");
    if (el) {
      el.style.transform = `translateX(0px) rotateY(0deg) scale(0)`;
      el.style.scale = 0;
    }
  };

  const elementInnerLeaveRemove = (e) => {
    if (e.clientY > 40) {
      let el = e.target.closest("li[data-elementid]").querySelector("ul");
      if (el) {
        el.style.transform = `translateX(0px) rotateY(0deg) scale(0)`;
        el.style.scale = 0;
        el.style.height = 0;
      }
    }
  };

  const removeSliderBox = (e) => {
    dropdownSlide.current.style.scale = 0;
    dropdownSlide.current.style.opacity = 0;
  };

  const showSliderBox = (e) => {
    dropdownSlide.current.style.opacity = 1;
    dropdownSlide.current.style.scale = 1;
  };

  const createNewPage = () => {
    pageDesignState.setDesign({ ...pageDesignState.design, settigMode: 4 });
  };

  return (
    <nav className="flex box-shadow border-b">
      <div className="navbar_header_logo">WebPage Builder</div>
      {isPageDesign &&
        pageDesignState.webDesignState.pages &&
        pageDesignState.webDesignState.pages.length > 0 && (
          <div className="navbar_header_logo">
            <span
              className="pageSelectorSpan"
              onClick={() => {
                selectPageList.current.classList.toggle("show");
              }}
            >
              {pageDesignState.webDesignState.pages &&
                pageDesignState.webDesignState.pages.map((e) => {
                  return UserDetailsState.editorState.pageId === e.pageId
                    ? e.pageName
                    : "";
                })}
            </span>
            <>
              <button
                className="selectPage"
                onClick={() => {
                  selectPageList.current.classList.toggle("show");
                }}
              >
                <i className="las la-angle-down"></i>
              </button>
              <div ref={selectPageList} className="subPagesList">
                <ul className="selectPage">
                  <div className="inList">
                    {pageDesignState.webDesignState.pages &&
                      pageDesignState.webDesignState.pages.map((e, i) => {
                        return (
                          <li
                            key={i}
                            className={
                              UserDetailsState.editorState.pageId === e.pageId
                                ? "active menuPagesList"
                                : "menuPagesList"
                            }
                          >
                            <Link
                              className="pageOption"
                              to={`/designer/${UserDetailsState.editorState.websiteId}/${e.pageId}/`}
                              data-page-id={e.pageId}
                            >
                              {e.pageName}
                            </Link>
                          </li>
                        );
                      })}
                  </div>
                  <hr />
                  <button onClick={createNewPage}>+ Create New Page</button>
                </ul>
              </div>
            </>
          </div>
        )}
      <div
        ref={parentDropDownSlide}
        className={
          isPageDesign || isPageDesignEmpty
            ? "navbar_menu_bar"
            : "navbar_menu_bar expanded"
        }
      >
        <ul
          className="navbar_menu_level_one"
          onMouseEnter={showSliderBox}
          onMouseLeave={removeSliderBox}
        >
          {isPageDesign || isPageDesignEmpty ? (
            <>
              <li
                data-elementid="1"
                data-dropheight="115"
                onMouseEnter={currentActiveMenu}
                onMouseLeave={elementLeaveRemove}
              >
                <a href="#">WebPage</a>
                <ul
                  className="navbar_menu_level_two"
                  onMouseLeave={elementInnerLeaveRemove}
                >
                  <li>
                    <a onClick={createNewPage}>New Page</a>
                  </li>
                  <li>
                    <a onClick={pageDesignState.getWebPageImageAndSavePage}>
                      Save Page
                    </a>
                  </li>
                  <li>
                    <a onClick={pageDesignState.publishWebPage}>Publish Page</a>
                  </li>
                  {pageDesignState.webDesignState.pages &&
                    pageDesignState.webDesignState.pages.length > 1 && (
                      <li>
                        <a onClick={pageDesignState.removeWebPage}>
                          Delete Page
                        </a>
                      </li>
                    )}
                  <li>
                    <Link to="/my-websites">Exit editor</Link>
                  </li>
                </ul>
              </li>
              <li
                data-elementid="2"
                data-dropheight="86"
                onMouseEnter={currentActiveMenu}
                onMouseLeave={elementLeaveRemove}
              >
                <a href="#">Settings</a>
                <ul
                  className="navbar_menu_level_two"
                  onMouseLeave={elementInnerLeaveRemove}
                >
                  <li className="pointerHover">
                    <a
                      onClick={() => {
                        pageDesignState.setDesign({
                          ...pageDesignState.design,
                          settigMode: 3,
                        });
                      }}
                    >
                      Settings & Meta
                    </a>
                  </li>
                  <li className="pointerHover">
                    <a
                      onClick={() => {
                        pageDesignState.setDesign({
                          ...pageDesignState.design,
                          settigMode: 1,
                        });
                      }}
                    >
                      Font Manager
                    </a>
                  </li>
                  <li className="pointerHover">
                    <a
                      onClick={() => {
                        pageDesignState.setDesign({
                          ...pageDesignState.design,
                          settigMode: 2,
                        });
                      }}
                    >
                      Google Analytics
                    </a>
                  </li>
                </ul>
              </li>
              <li
                data-elementid="3"
                data-dropheight="57"
                onMouseEnter={currentActiveMenu}
                onMouseLeave={elementLeaveRemove}
              >
                <a href="/">About</a>
                <ul
                  className="navbar_menu_level_two"
                  onMouseLeave={elementInnerLeaveRemove}
                >
                  <li>
                    <a
                      href="https://github.com/abhibagul/Wix-Clone"
                      target="_blank"
                    >
                      Project Link
                    </a>
                  </li>
                  <li>
                    <a href="/">Donate</a>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <li
              data-elementid="1"
              data-dropheight="57"
              onMouseEnter={currentActiveMenu}
              onMouseLeave={elementLeaveRemove}
            >
              <a href="/">About</a>
              <ul
                className="navbar_menu_level_two"
                onMouseLeave={elementInnerLeaveRemove}
              >
                <li>
                  <a
                    href="https://github.com/abhibagul/Wix-Clone"
                    target="_blank"
                  >
                    Project Link
                  </a>
                </li>
                <li>
                  <a href="/">Donate</a>
                </li>
              </ul>
            </li>
          )}
        </ul>
        <div ref={dropdownSlide} className="spanning_menu_box"></div>
      </div>
      {(isPageDesign || isPageDesignEmpty) && (
        <>
          <div className="user-web-link">
            <span>{`http://${window.location.hostname}/web/${pageDesignState.webDesignState._id}${pageDesignState.design.pageUri}`}</span>
            <a
              className="external-open"
              target="_blank"
              href={
                !pageDesignState.design.published
                  ? `/preview/${UserDetailsState.editorState.websiteId}/${UserDetailsState.editorState.pageId}/`
                  : `/web/${pageDesignState.webDesignState._id}${pageDesignState.design.pageUri}`
              }
            >
              <i className="las la-external-link-alt"></i>
            </a>
          </div>
          <div className="flex user_persistant_actions">
            <ul className="navbar_menu_level_one">
              <li>
                <a
                  onClick={() =>
                    pageDesignState.setDesign({
                      ...pageDesignState.design,
                      pageMode: 1,
                    })
                  }
                  className="btn_responsive responsive_mobile"
                >
                  {" "}
                  <i className="las la-desktop"></i>
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    pageDesignState.setDesign({
                      ...pageDesignState.design,
                      pageMode: 0,
                    })
                  }
                  className="btn_responsive responsive_pc"
                >
                  {" "}
                  <i className="las la-mobile"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex user_persistant_actions">
            <ul className="navbar_menu_level_one">
              <li>
                <a
                  className="highlight_btn_light_prev"
                  href={
                    !pageDesignState.design.published
                      ? `/preview/${UserDetailsState.editorState.websiteId}/${UserDetailsState.editorState.pageId}/`
                      : `/web/${pageDesignState.webDesignState._id}${pageDesignState.design.pageUri}`
                  }
                  target="_blank"
                >
                  {!pageDesignState.design.published ? "Preview" : "Open"}
                </a>
              </li>
              <li>
                <a
                  className="highlight_btn_light"
                  onClick={pageDesignState.getWebPageImageAndSavePage}
                >
                  {!pageDesignState.design.published ? "Save" : "Update"}
                </a>
              </li>
              <li>
                <a
                  onClick={pageDesignState.publishWebPage}
                  className="highlight_btn"
                >
                  {!pageDesignState.design.published ? "Publish" : "UnPublish"}
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
      <div className="navbar_user_details">
        <ul className="navbar_user_details">
          <li>
            <a href="/" className="navbar_user_profile">
              {UserDetailsState.user.user
                ? UserDetailsState.user.user.charAt(0).toUpperCase()
                : "U"}
            </a>
            <ul>
              <li>
                <Link to="/my-websites">My Websites</Link>
              </li>
              <li>
                <a
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
