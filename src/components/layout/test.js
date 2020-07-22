import React, { Component } from "react";
import "/home/momtazi/Projects/news_tracker/web/my-app/src/App.css";
class TestServer extends Component {
    constructor() {
        super();
        this.state = {
          news_list: [],
          search_keyword: ""
        };
    }
    async componentDidMount() {
        console.log("helloooooooo sepid");
        var result = await fetch("http://gw.ceit.aut.ac.ir:50052/api/news/test", {
        method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("oooooooooo");
    // console.log(result)
    let jsonRes = await result.text();
    console.log(jsonRes)
    // let finalResult = await JSON.parse(jsonRes);
    // console.log(finalResult)
    }
    render() {
        return (<div>
            <div>
                salam
            </div>
            <div>this is news tracker project</div>
            </div>)
    }
}
export default TestServer;