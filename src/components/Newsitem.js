import React, { Component } from 'react'

export class Newsitem extends Component {
    

  render() {
    let {title,description,imageurl,newsurl,author,date,sources}=this.props;
    return (
      <div className='m-3'>
        <div className="card">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:'1'}} >
    {sources}
  </span>
  <img src={!imageurl?"https://images.moneycontrol.com/static-mcnews/2023/09/market_volatile-3-770x433.jpg":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className='text-muted'>By {author?author:"NewsTV"} on  {new Date(date).toGMTString()}  </small></p>
    <a href={newsurl} target='_blank' rel='noreferrer' className="btn btn-dark">Read more &#8594;</a>
  </div>
</div>
        
      </div>
    )
  }
}

export default Newsitem