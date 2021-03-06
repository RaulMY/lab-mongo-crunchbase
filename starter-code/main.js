const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const url = `mongodb://localhost:27017/crunchbase`

mongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database');
    console.log(error);
  } else {
    console.log('Connection established correctly!! 😬');

    function mainMenu(){
        clear();
        printMenu();
        rl.question('Type an option: ', (option) => {
          switch(option){
            case "1":
            //   console.log('you typed 1');
              db.collection('companies').find({}, {name: 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log("These are all the companies:")
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
            //   rl.question(`\nType enter to continue: `, (answer) => {mainMenu()});
              break;
            case "2":
            //   console.log('you typed 2');
            //   rl.question(`\nType enter to continue: `, (answer) => {mainMenu()});
            db.collection('companies').find({}).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(`There are ${result} companies`);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })

              break;
            case "3":
            db.collection('companies').find({"founded_year":2004}).count((error, result) => {
                if (error) {
                    console.log(error);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log(`${result} companies were founded in 2004`);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
                })
                 
                break;
            case "4":
            db.collection('companies').find({"founded_year":2004, "founded_month":2}, {name: 1, _id: 0}).toArray((error, result) => {
                  if (error) {
                    console.log(error);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                  } else {
                    console.log("These companies were founded in February 2004")
                    console.log(result);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                  }
                 })
                 
                break;
            case "5":
            db.collection('companies').find({"founded_year":2004,"founded_month":{$gte:4, $lte:6}}, {name: 1, _id: 0,"founded_year":1, "founded_month":1,"founded_day":1}).sort({"founded_month": 1,"founded_day": 1}).toArray((error, result) => {
                  if (error) {
                    console.log(error);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                  } else {
                      console.log("These companies were founded in the summer of 2004")
                    console.log(result);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                  }
                 })
                 
                break;
            case "6":
                  db.collection('companies').find({"offices":{ $elemMatch: {"city":"Barcelona"}}}, {name: 1, _id: 0}).toArray((error, result) => {
                    if (error) {
                      console.log(error);
                      rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                    } else {
                        console.log("These companies have offices in Barcelona:")
                      console.log(result);
                      rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                    }
                   })
                  break;
            case "7":
                  db.collection('companies').find({}, {name: 1, _id: 0,"number_of_employees":1}).limit(10).sort({"number_of_employees": -1}).toArray((error, result) => {
                        if (error) {
                          console.log(error);
                          rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                        } else {
                            console.log("The 10 companies with the highest number of employees are:")
                          console.log(result);
                          rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                        }
                       })
                       
                break;
            case "8":
              db.collection('companies').find({name: "Facebook"}, {name: 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log("Here's  Facebook");
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "9":
              db.collection('companies').find({name: "Facebook"}, {number_of_employees: 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log("Facebook has this many employees");
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "10":
              db.collection('companies').find({name: "Facebook"}, {products: 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log("These are Facebook's products:")
                    for (var i=0; i<result.length; i++){
                        console.log(result[i]);
                    }
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "11":
              db.collection('companies').find({"name":"Facebook", "relationships.is_past":{$eq:false}}, {"relationships":1, _id:0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log("These people currently work at Facebook:")
                result[0].relationships.forEach(p=>{
                    if (p.is_past==false){
                    console.log(" "+p.person.first_name, p.person.last_name)
                    }
                });
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "12":
              db.collection('companies').find({"name":"Facebook", "relationships.is_past":{$eq:true}},{"relationships": 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    let counter =0;
                    result[0].relationships.forEach(p=>{
                        if (p.is_past==true){
                        counter++;
                        }
                    });
                    console.log(`${counter} people used to work at Facebook`);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "13":
              db.collection('companies').find({"relationships.person.permalink":"david-ebersman"},{"name": 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log("David Ebersman worked in these companies")
                    console.log(result)
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "14":
              db.collection('companies').find({"name":"Facebook"},{"competitions": 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log("These are Facebook's competitors")
                    result[0].competitions.forEach(c=>{
                        console.log(c.competitor.name)
                    });
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "15":
            db.collection('companies').find({"tag_list":{$regex : /.*social-networking.*/}},{"name": 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log("These companies consider themselves Social Networks")
                    console.log(result)
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "16":
            db.collection('companies').find({"tag_list":{$regex : /.*social-networking.*/}, "founded_year":{$gte:2002, $lte:2016}},{"name": 1, _id: 0, "founded_year":1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log(`${result.length} companies were founded between 2002 and 2016 inclusive, that consider themselves social networks`)
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "17":
              db.collection('companies').find({"offices":{ $elemMatch: {"city":"London"}}}, {name: 1, _id: 0, "offices":1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log("These are the locations of companies that have offices in London")
                    result.forEach(c=>{
                        console.log(`Company: ${c.name}`);
                        c.offices.forEach(d=>{
                            console.log(`  Location: ${d.city}`);
                        })
                    });
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "18":
            db.collection('companies').find({"tag_list":{$regex : /.*social-networking.*/}, "founded_year":{$gte:2002, $lte:2016},"offices":{ $elemMatch: {"city":"New York"}}},{"name": 1, _id: 0, "founded_year":1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log(`${result.length} companies were founded between 2002 and 2016 inclusive, that consider themselves social networks and have offices in New York`)
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "19":
              db.collection('companies').distinct("category_code",(error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log("These are the categories")  
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "20":
            db.collection('companies').find({"overview":{$regex : /.*Google.*/}},{"name": 1, _id: 0, "overview":1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    console.log(`${result.length} companies mention Google in their overviews`)
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
               })
              break;
              case "21":
            db.collection('companies').find({"founded_year":2004}, {"name": 1, _id: 0, "funding_rounds":1}).toArray((error, result) => {
                if (error) {
                    console.log(error);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                    let totalSum=0;
                    let counter=0;
                    result.forEach(c=>{
                        if (c.funding_rounds.length>=5){
                            let sum=0;
                            counter++;
                            console.log(`Company: ${c.name}`);
                            c.funding_rounds.forEach(d=>{
                                sum+=d.raised_amount;
                                console.log(`  Amount Raised: ${d.raised_amount}`);
                            })
                            console.log(` Total Amount Raised: ${sum}`)
                            console.log(` Average Amount Raised: ${sum/c.funding_rounds.length}`)
                            totalSum+=sum;
                        }
                        
                    });
                    console.log(`Total Amount Raised by Companies founded in 2004: ${totalSum}`)
                    console.log(`Average Amount Raised by Companies founded in 2004: ${totalSum/counter}`)
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
                })
                 
                break;
            case "0":
              console.log(`👋👋👋👋 😞 \n`);
              db.close((error) => { process.exit(0) });
              break;
            default:
              mainMenu();
              break;
          }
        });
      }
  
      mainMenu();
  
    }
});

function printMenu(){
	console.log(`
0.- Exit
1.- List by name all companies.
2.- How many companies are there?
3.- How many companies were founded in 2004?
4.- List by name all companies founded in february of 2004.
5.- List by name all companies founded in the summer of 2004 (april to june) sorted by date.
6.- What companies have offices in "Barcelona".
7.- List the 10 companies with more employees sorted ascending (show name and employees).
8.- Find the company with the name "Facebook"
9.- How many employees has Facebook?
10.- List the name of all the products of Facebook
11.- List the people that are working at Facebook right now (check relationships field)
12.- How many people are not working anymore at Facebook
13.- List all the companies where "david-ebersman" has worked.
14.- List by name the competitors of Facebook
15.- Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
16.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
17.- Names and locations of companies that have offices in London
18.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
19.- List all the categories
20.- How many companies mention Google in their overview?
21.- Calculate the average amount raised by companies founded in 2004 that had 5 or more rounds of founding
`);
}

