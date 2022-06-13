import executeQuery from "../../components/utilities/db";

export var month
export default async(req, res) => {
    try {
        const query = "SELECT * FROM haur_blog.events"
        const result = await executeQuery(query)
        console.log("in testsql: ", result[0][0].title)
        
        res.status(200).json({result});
    }
    catch(error){
        console.log(error)
    }
  }