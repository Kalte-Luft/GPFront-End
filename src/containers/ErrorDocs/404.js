import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";

const BadRequest = (props) => {
    const handleNavigate = (path) => {
        props.history.push(path);
    };
    return (
        <React.Fragment>
            <Helmet>
                <meta charset="utf-8" />
                {/* <title>404</title> */}
                <meta name="author" content="pkfrom" />
                <meta
                    name="keywords"
                    content="404 page, css3, template, html5 template"
                />
                <meta name="description" content="404 - Page Template" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <link
                    type="text/css"
                    media="all"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
                    rel="stylesheet"
                />
                <link
                    type="text/css"
                    media="all"
                    href="//pkfrom.github.io/404/assets/css/404.min.css"
                    rel="stylesheet"
                />

                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="//pkfrom.github.io/404/assets/img/favicons/favicon144x144.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="//pkfrom.github.io/404/assets/img/favicons/favicon114x114.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="//pkfrom.github.io/404/assets/img/favicons/favicon72x72.png"
                />
                <link
                    rel="apple-touch-icon"
                    href="//pkfrom.github.io/404/assets/img/favicons/favicon57x57.png"
                />
                {/* <link
                    rel="shortcut icon"
                    href="//pkfrom.github.io/404/assets/img/favicons/favicon.png"
                /> */}
                <link
                    href="http://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900"
                    rel="stylesheet"
                    type="text/css"
                />
            </Helmet>
            
            <div class="animationload">
                <div class="loader"></div>
            </div>

            <div id="wrapper">
                <div class="container" style={{border: "none", boxShadow: "none", padding :"0"}}>
                    <div class="switcher">
                        <input id="sw" type="checkbox" class="switcher-value" />
                        <label for="sw" class="sw_btn"></label>
                        <div class="bg"></div>
                        <div class="text">
                            Turn <span class="text-l">off</span>
                            <span class="text-d">on</span>
                            <br />
                            the light
                        </div>
                    </div>

                    <div id="dark" class="row text-center">
                        <div class="info">
                            <img
                                src="//pkfrom.github.io/404/assets/img/404-dark.png"
                                alt="404 error"
                            />
                        </div>
                    </div>

                    <div id="light" class="row text-center">
                        <div class="info">
                            <img
                                src="//pkfrom.github.io/404/assets/img/404-light.gif"
                                alt="404 error"
                            />
                            <p>
                                The page you are looking for was moved, removed,
                                <br />
                                renamed or might never existed.
                            </p>
                            <a onClick={()=>handleNavigate("/home") } class="btn"  style={{height :"46px"}}>
                                Go Home Page
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Scripts */}
            <Helmet>
                <script
                    src="https://code.jquery.com/jquery-2.2.0.min.js"
                    type="text/javascript"
                ></script>
                <script
                    src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
                    type="text/javascript"
                ></script>
                <script
                    src="//pkfrom.github.io/404/assets/js/modernizr.custom.js"
                    type="text/javascript"
                ></script>
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.6.0/jquery.nicescroll.min.js"
                    type="text/javascript"
                ></script>
                <script
                    src="//pkfrom.github.io/404/assets/js/404.min.js"
                    type="text/javascript"
                ></script>
            </Helmet>
        </React.Fragment>
    );
};

export default withRouter(BadRequest);
