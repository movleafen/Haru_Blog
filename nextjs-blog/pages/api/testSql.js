import testRes from "../../components/utilities/db";

export default async(req, res) => {
    try {
        const result = await testRes()
        console.log("in testsql: ", result[0][0].title)
        
        res.status(200).json({Text: "Hello World"});
    }
    catch(error){
        console.log(error)
    }
  }