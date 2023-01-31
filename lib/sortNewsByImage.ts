export default function sortNewsByImage(news: NewsResponse){
    const newsWithImage = news.data.filter((item) => item.image !== null)
    const newsWithoutImage = news.data.filter((item) => item.image === null)

    const sortedNewsReponse = {
        pagination: news.pagination,
        data: [...newsWithImage, ...newsWithoutImage],

    }


    return sortedNewsReponse
}