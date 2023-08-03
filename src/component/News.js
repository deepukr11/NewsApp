import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner'
let newsUrl = "https://newsapi.org/v2/top-headlines?"
const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [pageNo, setpageNo] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews = async () => {
    props.setProgress(10);
    let url = `${newsUrl}country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let passedData = await data.json()
    props.setProgress(50);
    setarticles(passedData.articles)
    settotalResults(passedData.totalResults)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsTo`
    updateNews();
    // eslint-disable-next-line
  }, [])

  // const preClick = async () => {
  //   let url = `${newsUrl}country=${props.country}&category=${props.category}&${props.apiKey}&page=${pageNo - 1}&pageSize=${props.pageSize}`;
  //   let data = await fetch(url);
  //   let passedData = await data.json()
  //   setpageNo(pageNo - 1)
  //   setarticles(passedData.articles)    
  //    

  //   // setpageNo(pageNo - 1)
  //   // updateNews();
  // }

  // const nextClick = async () => {

  //   let url = `${newsUrl}country=${props.country}&category=${props.category}&${props.apiKey}&page=${pageNo + 1}&pageSize=${props.pageSize}`;
  //   let data = await fetch(url);
  //   let passedData = await data.json()
  //   setpageNo(pageNo + 1)
  //   setarticles(passedData.articles)   

  //   // setpageNo(pageNo + 1)
  //   // updateNews();
  // }

  const fetchMoreData = async () => {
    let url = `${newsUrl}country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo + 1}&pageSize=${props.pageSize}`;
    setpageNo(pageNo + 1);
    let data = await fetch(url);
    let passedData = await data.json()
    setarticles(articles.concat(passedData.articles))
    settotalResults(passedData.totalResults)
  };
  return (
    <div className='container my-4'>
      <h2 className='text-center' style={{ marginTop: `70px` }}><strong>NewsTO : </strong> &laquo;Top {capitalizeFirstLetter(props.category)} Hadlines &raquo;</h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={articles.length === totalResults ? "" : <Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem tytle={element.title ? element.title.slice(0, 40) : ""} newsUrl={element.url} description={element.description ? element.description.slice(0, 90) : ""} author={element.author} date={element.publishedAt} imageUrl={element.urlToImage} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={pageNo <= 1} className="btn btn-dark" onClick={preClick}>&laquo; Previous</button>
          <button type="button" disabled={pageNo > .totalResults / props.pageSize} className="btn btn-dark" onClick={nextClick}>Next &raquo;</button>
        </div> */}
    </div>
  )
}
export default News
