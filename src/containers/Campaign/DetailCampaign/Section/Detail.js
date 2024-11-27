import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./Detail.scss";

const Detail = () => {
    return (
        <div className="detail-container">
            <div className="left-content">
                <div className="status">
                    <h1>Status</h1>
                    <p>
                        <i class="fa fa-tasks" aria-hidden="true"></i>Ongoing
                    </p>
                </div>
                <div className="start-date">
                    <h1>Start date</h1>
                    <p>
                        <i class="fa fa-calendar-alt" aria-hidden="true"></i>
                        2021-07-07
                    </p>
                </div>
                <div className="end-date">
                    <h1>End date</h1>
                    <p>
                        <i class="fa fa-calendar-alt" aria-hidden="true"></i>
                        2021-08-07
                    </p>
                </div>
            </div>
            <div className="center-content">
                <p>
                    - On the other hand, we denounce with righteous indignation
                    and dislike men who are so beguiled and demoralized by the
                    charms of pleasure of the moment, so blinded by desire, that
                    they cannot foresee the pain and trouble that are bound to
                    ensue; and equal blame belongs to those who fail in their
                    duty through weakness of will, which is the same as saying
                    through shrinking from toil and pain. These cases are
                    perfectly simple and easy to distinguish. In a free hour,
                    when our power of choice is untrammelled and when nothing
                    prevents our being able to do what we like best, every
                    pleasure is to be welcomed and every pain avoided. But in
                    certain circumstances and owing to the claims of duty or the
                    obligations of business it will frequently occur that
                    pleasures have to be repudiated and annoyances accepted. The
                    wise man therefore always holds in these matters to this
                    principle of selection: he rejects pleasures to secure other
                    greater pleasures, or else he endures pains to avoid worse
                    pains. - On the other hand, we denounce with righteous
                    indignation and dislike men who are so beguiled and
                    demoralized by the charms of pleasure of the moment, so
                    blinded by desire, that they cannot foresee the pain and
                    trouble that are bound to ensue; and equal blame belongs to
                    those who fail in their duty through weakness of will, which
                    is the same as saying through shrinking from toil and pain.
                    These cases are perfectly simple and easy to distinguish. In
                    a free hour, when our power of choice is untrammelled and
                    when nothing prevents our being able to do what we like
                    best, every pleasure is to be welcomed and every pain
                    avoided. But in certain circumstances and owing to the
                    claims of duty or the obligations of business it will
                    frequently occur that pleasures have to be repudiated and
                    annoyances accepted. The wise man therefore always holds in
                    these matters to this principle of selection: he rejects
                    pleasures to secure other greater pleasures, or else he
                    endures pains to avoid worse pains - On the other hand, we
                    denounce with righteous indignation and dislike men who are
                    so beguiled and demoralized by the charms of pleasure of the
                    moment, so blinded by desire, that they cannot foresee the
                    pain and trouble that are bound to ensue; and equal blame
                    belongs to those who fail in their duty through weakness of
                    will, which is the same as saying through shrinking from
                    toil and pain. These cases are perfectly simple and easy to
                    distinguish. In a free hour, when our power of choice is
                    untrammelled and when nothing prevents our being able to do
                    what we like best, every pleasure is to be welcomed and
                    every pain avoided. But in certain circumstances and owing
                    to the claims of duty or the obligations of business it will
                    frequently occur that pleasures have to be repudiated and
                    annoyances accepted. The wise man therefore always holds in
                    these matters to this principle of selection: he rejects
                    pleasures to secure other greater pleasures, or else he
                    endures pains to avoid worse pains
                </p>
            </div>
            <div className="right-content">
                <div className="login-info">
                    <h1>Login notification</h1>
                    <button>Login to join our campaign</button>
                </div>
                <div className="location">
                    <h1>Location</h1>
                    <p>
                        <i class="fas fa-map-marker-alt"></i>
                        Dragon Bridge, Da Nang City
                    </p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0844029613672!2d108.22511767496832!3d16.06110933965551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219d2f38ce45d%3A0xbfa47dd116d4db88!2zQ-G6p3UgUuG7k25nLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1732723812769!5m2!1svi!2s"
                        className="map"
                        allowfullscreen="true"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
