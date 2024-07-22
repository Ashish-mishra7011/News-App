import React, { Component } from 'react'
import {v4 as uuidv4} from 'uuid';
import Newsitem from './Newsitem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps ={
    country:"in",
    pageSize:"8",
    category:"general"
  }
  static propTypes={
    category:PropTypes.string,
    country:PropTypes.string,
    pageSize:PropTypes.number
  }
   
    constructor(){
        super();
       this.state={
        articles: [],
        loading:false,
        page:1,
        totalResults:0

       }
     }
async updatenews(){
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a37e784ece804d1f8fc7d49054b852de&page=${this.props.page}&pagesize=${this.props.pageSize}`
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
  
}
async componentDidMount(){
this.updatenews();
}
fetchMoreData= async()=>{
  this.setState({page:this.state.page+1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a37e784ece804d1f8fc7d49054b852de&page=${this.props.page}&pagesize=${this.props.pageSize}`
 
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({articles:this.state.articles.concat(parsedData.articles),
    totalResults:parsedData.totalResults,
    loading:false})

}



  render() {
    return (
      <>
        <h2 className="text-center" style={{margin:"40px 0"}}>NewsTv - Top Headlines</h2>
       {this.state.loading && <Loading/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading/>}
        >
          <div className="container">
        <div className="row">
           { this.state.articles.map((element)=>{
             return <div className="col-md-4" key={uuidv4()}>
             <Newsitem  title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} sources={element.source.name} />
             </div>

            })}
               
       </div>
       </div>
       </InfiniteScroll>
      
  </>

     
    )
  }
}

export default News