
import React, { useState, useEffect, Fragment } from 'react'
import { Button } from '../components/layouts/Button'
import { Link } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range'
import moment from 'moment'
import categoryURL from './layouts/categoryURL'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Material UI stuff
import {
	makeStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Select,
	MenuItem,
	FormControl
	} from '@material-ui/core'
import { Category } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
		maxWidth: 345,
	},
	container: {
		display: "grid",
		justifyContent: "center",
	},
	input: {
		background: "#eee",
		padding: "12px 15px",
		margin: "8px 0",
		border: "2px solid var(--third-color)",
		borderRadius: "5px",
		maxHeight: "5vh",
		fontFamily: ["Architects Daughter", "cursive"].join(","),
	},
	inputImg: {
		padding: "12px 15px",
		margin: "8px 0",
		border: "2px solid var(--third-color)",
		borderRadius: "5px",
	},
	title: {
		backgroundColor: "var(--background)",
		"&>h2": {
			fontFamily: ["Architects Daughter", "cursive"].join(","),
			fontSize: "1.7rem",
			letterSpacing: ".9em",
			textAlign: "center"
		}
	},
	menu: {
		fontFamily: ["Architects Daughter", "cursive"].join(","),
		background: "var(--background)",
		color: "var(--third-color)",
		// display: "inline-flex",
		// alignItems: "center"
	}
});

export default function InformCard(props) {
  const classes = useStyles();
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [createdAt, setCreatedAt] = useState('')
	const [price, setPrice] = useState('')
	const [profit, setProfit] = useState('')
	const [open, setOpen] = useState(false)
	const [openCalendar, setOpenCalendar] = useState(false)
	const credentials = useSelector(state => state.data.credentials) 

	useEffect(()=> {
		console.log(category)
	},[category])
  return (
		credentials.length !== 0 &&
		<Fragment>
			<Link to="#" onClick={()=>setOpen(true)} className="animate__animated animate__flipInX animate__delay-.5s">
        <i className="fas fa-info fa-2x"></i>
      </Link>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				fullWidth
				maxWidth="xs"
			>
			<DialogTitle className={classes.title}>Information</DialogTitle>
				<DialogContent style={{
					backgroundColor: "var(--background)",
					margin: ".3rem",
    			borderRadius: "20px"}}>
					<FormControl className={classes.container}>
						<section className="form-field">
							<h3>description</h3>	
							<input 
								type="text" 
								value={credentials.description}
								className={classes.input}
								onChange={event => console.log(event.target.value)} 
							/>
						</section>
						<section className="form-field">
							<h3>category</h3>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={credentials.category}
								onChange={e=>setCategory(e.target.value)}
								label="Age"
								className={classes.input}
							>
								{categoryURL.filter(item=>item.title===credentials.category).map(item=>
									<MenuItem className={classes.menu} key={item.title} value={item.title}>
										<div className="select-menu">
											<p>{item.title}</p>
											<img className="select-images" src={item.url} alt="icons" />
										</div>
									</MenuItem>
									)}
								)}
								{categoryURL.filter(item=>item.title!==credentials.category).map(item=>
									<MenuItem className={classes.menu} key={item.title} value={item.title}>
										<div className="select-menu">
											<p>{item.title}</p>
											<img className="select-images" src={item.url} alt="icons" />
										</div>
									</MenuItem>
								)}
							</Select>
						</section>
						<section className="form-field">
							<h3>date</h3>
							<div onClick={()=> setOpenCalendar(true)}>
								<input 
									type="text" 
									value={moment(credentials.createdAt).format('dddd MMM Do')}
									className={classes.input}
									onChange={event => (event.target.value)}
									disabled
									style={{cursor: "pointer"}}
								/>
							</div>
							<Dialog
								open={openCalendar}
								onClose={() => setOpenCalendar(false)}
								fullWidth
								maxWidth="sm"
								style={{display: "flex",justifyContent: "end"}}
							>
								<DialogContent>
									<Calendar
										date={new Date()}
										// onChange={this.handleSelect}
									/>
								</DialogContent>
							</Dialog>
						</section>
						<section className="form-field">
							<h3>image</h3>
							<input 
								type="image"
								alt="avatar"
								src={credentials.imageUrl}
								className={classes.inputImg}
								onChange={event => (event.target.value)}
								disabled
								style={{cursor: "pointer"}}
							/>
						</section>
						<section className="form-field">
							<h3>price</h3>
							<input 
								type="number" 
								value={credentials.price}
								className={classes.input}
								onChange={event => (event.target.value)}
							/>
						</section>
					</FormControl>
				</DialogContent>
				<DialogActions style={{backgroundColor: "var(--background)"}}>
					<Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
					<Button onClick={(e) => {
						e.preventDefault()
						const userDetails = {
							// bio,
							// website,
							// location
						}
						// dispatch(editUserDetails(userDetails))
						setOpen(false)
					}} color="primary">Save</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	)
}
