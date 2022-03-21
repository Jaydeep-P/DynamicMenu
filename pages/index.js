import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import menu from "../public/menu.json"
import { useState } from 'react/cjs/react.production.min'

function FoodItem({x}) {
	return(
		<div className={styles.foodItem}>{x}</div>
	)
}

function Meal({meal}){
	return(
		<div>
			{
				meal.map((x,index)=>
					{
						if(index!=0) // skip the time
							return <FoodItem x={x} key={index}/>
					}
				)
			}
		</div>
	)
}

export default function Home() {
	// const [currind,setInd] = useState(-1);
	const d = new Date();
	let day = d.getDay(); // 0 for sunday 1 for monday...

	let hour = `${d.getHours()}`;
	let mins = `${d.getMinutes()}`;
	if(hour.length<2) hour = '0'+hour
	if(mins.length<2) mins = '0'+mins
	let currTime = hour+mins;
	let currindex = 0;
	for(let i=0;i<menu[day].length;i++){
		if(currTime>menu[day][i][0]){
			currindex=i+1;
		}
	}
	if(currindex==4){
		day++;
		day%=7;
		currindex=0;
	}

	let nextMeal = menu[day][currindex];
	//Might be confusing but just gets the next meal
	let nextToNextMeal = menu[(day + ((currindex+1)==menu[day].length?1:0))%7][(currindex+1)%menu[day].length];
	return (
		<div className={styles.container}>
			<Head>
				<title>Hungry?</title>
				<meta name="description" content="Dynamic time table for Hostel mess" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div className={styles.heading}>Dynamic Menu</div>
				<hr/>
				<div className={styles.nextMeal}>
					<div className={styles.heading}>Next Meal</div>
					<Meal meal={nextMeal}/>
				</div>
				<br/>
				<hr/>
				<div className={styles.nextMeal}>
					<div className={styles.heading}>After Next Meal</div>
					<Meal meal={nextToNextMeal}/>
				</div>
				<hr/>
				{/* <div className={styles.buttons}>
					<div className={styles.navButton}>Back</div>
					<div className={styles.navButton}>Next</div>
				</div> */}
			</main>
		</div>
	)
}
