import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import { Link } from 'react-router-dom';

export const Card = () => {

	const authenticated = useSelector(state => state.user.authenticated)
	const info = useSelector(state => state.user.info)
	const loading = useSelector(state => state.ui.loading)

	return (
		<CardContainer>
			{ !loading && authenticated && 
			<section className="animate__animated animate__backInUp">
				<img className="img" src={info.imageUrl} alt="avatar" />
				<div>
					<h2>{info.name}</h2>
					<p>{info.email}</p>
					<p>Joined {moment(info.createdAt).fromNow()}</p>
				</div>
				<div className="social-container card">
					<Link to="/" className="icons">
						<i className="fas fa-users-cog"></i>
					</Link>
					<Link to="#" className="icons">
						<i className="fas fa-table"></i>
					</Link>
					<Link to="#" className="icons">
						<i className="fas fa-chart-bar"></i>
					</Link>
					<Link to="#" className="icons">
						<i className="fas fa-sign-out-alt"></i>
					</Link>
				</div>
			</section>}
		</CardContainer>
	)
}

const CardContainer = styled.div`
section {
	display: inline-grid;
	grid-template-columns: repeat(2, 1fr);
	justify-content: center;
	align-items: center;
	position: relative;
	max-width: 300px;
	max-height: 175px;
	padding: 1em;
	background: rgba(255, 255, 255, .2);
	box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
	margin: 2rem;
	border-radius: 3%;
	grid-template-columns: repeat(2,1fr);
	grid-template-rows: 100px 70px;
	grid-template-areas:        
		"a b"
		"c c";
	justify-items: center;
  align-items: end;
}
.img {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	border: 1px solid var(--main-color);
	padding: 2px;
	margin-right: 1rem;
	grid-area: a;
}
div {
	grid-area: b;
	text-align: end;
}
h2 {
		font-size: 1em;
		text-transform: uppercase;
		color: var(--second-color);
	}
p {
		margin: 0;
		padding: 0;
		font-size: 0.5em;
		text-transform: uppercase;
		color: var(--main-color);
	}
.card {
	display: inline-flex;
	grid-area: c;
	padding: .5em;
}
.social-container a:before,
.social-container a:after {
	height: 35px !important;
  width: 35px !important;
}
`
