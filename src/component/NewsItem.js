import React from 'react'
const NewsItem = (props) => {
  let { tytle, description, imageUrl, newsUrl, author, date } = props;
  return (
    <div className='my-4'>
      <div className="card" >
        <img src={imageUrl ? imageUrl : "https://images.firstpost.com/wp-content/uploads/2023/07/Live-Blog-1.jpg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{tytle}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target='/' className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
    </div>
  )
}
export default NewsItem
