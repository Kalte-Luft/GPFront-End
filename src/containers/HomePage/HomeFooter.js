import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; //đa ngôn ngữ
import './Footer.scss';


class HomeFooter extends Component {

	render() {
		return (
			<div className="footer-background">

				<div className="footer-content">
					<div className="footer-content-top-background">
						<div className="footer-content-top">
							<div className="footer-content-top-left">
								<div className="logo"></div>
							</div>
							<div className="footer-content-top-center-left">
								<ul>
									<li ><a href="#" >Blog</a></li>
									<li ><a href="#" >About</a></li>
									<li ><a href="#" >Services</a></li>
									<li ><a href="#" >Campaign</a></li>
									<li ><a href="#" >Projects</a></li>
									<li ><a href="#" >Contact Us</a></li>
									<li ><a href="#" >terms &amp; Conditions </a></li>
									<li ><a href="#" >Cookie policy</a></li>
									<li ><a href="#" >Privacy</a></li>
								</ul>
							</div>
							<div className="footer-content-top-center-right">
								<ul>
									<li ><a href="#" >Da Nang</a></li>
									<li ><a href="#" >Binh Dinh</a></li>
									<li ><a href="#" >Hue</a></li>
									<li ><a href="#" >Dak Lak</a></li>

								</ul>
							</div>
							<div className="footer-content-top-right">
								<h3>Newsletter sign up</h3>
								<div className="input-email">
									<label>Email</label>
									<input type="email" 
									/>
									</div>
									< div className="sign-up-email">
                            <button className="submit" 
							//</div>onClick={() => { this.handleLogin() }}
							><b>Sign up</b></button>
                        </div>
								
							</div>
						</div>
						<div className="footer-content-bottom">
							<p>&copy; 2024 Greenpaws : Khanh &amp; Nghia Registered Charity Viet-Han
								<a target="_blank" href="https://www.facebook.com/profile.php?id=100048034400458"> &#8594; Click here &#8592; </a>
							</p>
						</div>
					</div>
				</div>

			</div>
		);
	}

}

const mapStateToProps = state => { //lấy biến thông qua state
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
	};
};

const mapDispatchToProps = dispatch => { //fire action event của redux
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter); //bộc 2 lớp dữ liệu từ store ra ngoài, kết nối redux với react
