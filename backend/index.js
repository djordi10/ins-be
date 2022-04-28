const bodyParser = require('body-parser')
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// bypass cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const connection = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'test'
});


insertPlan = (query) =>{
    return new Promise((resolve, reject)=>{
        connection.query(query,  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

app.get('/plan', (req, res) => {
	connection.query('SELECT * FROM Insurance_Plan p' , (err, rows) => {
		if(err){
			res.json({
				success: false,
				msg : "there an error, we're going to fix it asap"
				});
		}
		else{
			const data = rows
			res.json({
				success: true,
				data
				});
		}
	});
});

app.get('/detail', (req, res) => {
	console.log("query",req.query.id)
	const id = req.query.id
	connection.query('SELECT * FROM Insurance_Detail d where d.plan_id ='+id , (err, rows) => {
		if(err && rows.length == 0){
			res.json({
				success: false,
				msg: "there an error, we're going to fix it asap"
				});
		}
		else{
			const data = rows
			res.json({
				success: true,
				data
				});
		}
	});
});

app.post('/addPlan', async(req, res) => {

	if(req.body.name == null || req.body.name == undefined || req.body.name == ''){
		res.json({
			success: false,
			msg: "name is required"
			});
	}
	if(req.body.price == null || req.body.price == undefined || req.body.price == ''){
		res.json({
			success: false,
			msg: "price is required"
			});
	}
	if(req.body.general == null || req.body.general == undefined || req.body.general == ''){
		res.json({
			success: false,
			msg: "general is required"
			});
	}
	if(req.body.specialist == null || req.body.specialist == undefined || req.body.specialist == ''){
		res.json({
			success: false,
			msg: "specialist is required"
			});
	}
	if(req.body.physiotherapy == null || req.body.physiotherapy == undefined || req.body.physiotherapy == ''){
		res.json({
			success: false,
			msg: "physiotherapy is required"
			});
	}
	if(req.body.dentist == null || req.body.dentist == undefined || req.body.dentist == ''){
		res.json({
			success: false,
			msg: "dentist is required"
			});
	}
	if(req.body.chemo == null || req.body.chemo == undefined || req.body.chemo == ''){
		res.json({
			success: false,
			msg: "chemo is required"
			});
	}
	const name = req.body.name;
	const price = req.body.price;
	const general = req.body.general;
	const specialist = req.body.specialist;
	const physiotherapy = req.body.physiotherapy;
	const dentist = req.body.dentist;
	const chemo = req.body.chemo;
	try{
		let query = "INSERT INTO Insurance_Plan (plan_name, plan_price) VALUES ('"+name+"', '"+price+"')";
		const plan = await insertPlan(query)
		query = "INSERT INTO De (plan_name, plan_price) VALUES ('"+name+"', '"+price+"')";
		query = "INSERT INTO Insurance_Detail (plan_id, insurance_general, insurance_specialist, insurance_physiotherapy, insurance_dentist, insurance_chemo) VALUES ('"+plan.insertId+"', '"+general+"', '"+specialist+"', '"+physiotherapy+"', '"+dentist+"', '"+chemo+"')";
		const detail = await insertPlan(query)
		const data = detail
		res.json({
			success: true,
			msg: "Plan added successfully"
			});
	}catch(err){
		console.log(err)
		res.json({
			success: false,
			msg: "there an error, we're going to fix it asap"
			});
	}
});

app.listen(5000, () => console.log('listining on port 5000'));
