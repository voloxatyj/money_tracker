
import React, { useState, useEffect, Fragment } from 'react'
import { Button } from '../components/layouts/Button'
import { Link } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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
	TextField,
	Grid
	} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
		maxWidth: 345,
	},
	container: {
		display: "grid",
		justifyContent: "center"
	},
	input: {
		background: "#eee",
		padding: "12px 15px",
		margin: "8px 0",
		width: "100%",
		border: "2px solid var(--third-color)",
		borderRadius: "5px"
	},
	title: {
		backgroundColor: "var(--background)",
		"&>h2": {
			fontFamily: ["Architects Daughter", "cursive"].join(","),
			fontSize: "2rem",
			letterSpacing: ".9em",
			textAlign: "center"
		}
	}
});

export default function InformCard(props) {
  const classes = useStyles();
	const [category, setCategory] = useState(props.item.category)
	const [description, setDescription] = useState(props.item.description)
	const [createdAt, setCreatedAt] = useState(props.item.createdAt)
	const [price, setPrice] = useState(props.item.price)
	const [profit, setProfit] = useState(props.item.profit)
	const [open, setOpen] = useState(false)
	const [openCalendar, setOpenCalendar] = useState(false)
	// const credentials = useSelector(state => state.user.credentials) 
	const dispatch = useDispatch()
	useEffect(()=> {
		console.log(categoryURL)
	}
		
	)
  return (
		<Fragment>
			<Link to="#" onClick={()=>setOpen(true)} >
        <i className="fas fa-info fa-2x"
        	style={{color: "var(--third-color)"}} 
        ></i>
      </Link>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				fullWidth
				maxWidth="sm"
			>
			<DialogTitle className={classes.title}>Information</DialogTitle>
				<DialogContent style={{backgroundColor: "var(--background)"}}>
					<FormControl className={classes.container}>
						<input 
							type="text" 
							value={description}
							className={classes.input}
							onChange={event => console.log(event.target.value)} 
						/>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={category}
							// onChange={handleChange}
							label="Age"
							className={classes.input}
						>
							<MenuItem value={category}>
								<em>{category}</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
						<div onClick={()=> setOpenCalendar(true)}>
							<input 
								type="text" 
								value={moment(createdAt).format('dddd MMM Do')}
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
						<input 
								type="image"
								src={props.item.imageUrl}
								className={classes.input}
								onChange={event => (event.target.value)}
								disabled
								style={{cursor: "pointer"}}
							/>
						<input 
							type="number" 
							value={price}
							className={classes.input}
							onChange={event => (event.target.value)}
						/>
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
