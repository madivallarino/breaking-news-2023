import { gql } from 'graphql-request'
import sortNewsByImage from './sortNewsByImage';

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean,
) => {

    
  
    const query = gql `
    query myQuery(
            $access_key: String!
            $categories: String!
            $keywords: String 
            ){
        myQuery(
            access_key: $access_key
            categories: $categories
            countries: "us"
            keywords: $keywords
            ){
            data{
                author
                category
                country
                description
                image
                language
                published_at
                source
                title
                url
            }
            pagination{
                count
                limit
                offset
                total
            }
        }
    }
    `;
   
    
    
    // fetch function
    const res = await fetch('https://longquan.stepzen.net/api/lopsided-zebra/__graphql', {
        method: "POST",
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic? {revalidate: 0} : {revalidate: 20},
        headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
        }, 
        body: JSON.stringify({
            query, 
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords,
            }
        })

    })

    // console.log("LOADING NEW DATA FROM API for category >>> ", category, keywords);

    const newsResponse = await res.json();

    // sort by images vs not images present
    // console.log(newsResponse.data.myQuery)
  
    const news = sortNewsByImage(newsResponse.data.myQuery)
    
    

    return news
    
}

export default fetchNews;


// http://api.mediastack.com/v1/news?access_key=763f47f48309fd2db642e36eb813d18a