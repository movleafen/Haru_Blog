import executeQuery from "../../components/utilities/db";

export default async(req, res) => {
    try {
        const query = "SELECT * FROM haru_blog.events"
        const [result] = await executeQuery(query)
        res.status(200).json({result});
    }
    catch(error){
        console.log(error)
    }
}