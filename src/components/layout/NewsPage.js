import React, { Component } from "react";
import "/home/momtazi/Projects/news_tracker/web/my-app/src/App.css";
//import "/home/mnoroozi/final-project/news/backend/client/src/App.css";
class NewsPage extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      date: "",
      text: "",
      title: "",
      summary: "",
      tags: "",
      articleSection: "",
      code: "",
    };
  }
  async componentDidMount() {
    await this.getPage();
  }

  getPage = async () => {
    var ah = localStorage.getItem("newsid");
    console.log(ah);
    this.setState({
      url: ah,
    });
    console.log(ah);
    var newStr = ah.replace(/[:]/g, "\\:");
    newStr = newStr.replace(/[-]/g, "\\-");
    newStr = newStr.replace(/[\/]/g, "\\/");
    console.log(newStr);
    const data = { input: newStr };
    var result = await fetch(
      "http://gw.ceit.aut.ac.ir:50052/documents/getSpecifiedPage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    // console.log(result);
    let jsonRes = await result.text();
    let finalResult = JSON.parse(jsonRes);
    console.log(finalResult.hits.hits);
    this.loadInformation(finalResult.hits.hits);
  };

  loadInformation = async (a) => {
    console.log("load news page information");
    var searchResultDiv = document.getElementById("searchResultDiv");
    while (searchResultDiv.hasChildNodes()) {
      searchResultDiv.removeChild(searchResultDiv.lastChild);
    }

    // var news_item = document.createElement("div");
    // news_item.className = "news_item";
    // news_item.innerHTML =
    //   "برای عبارت مورد جست و جوی شما" + " " + a.length + " " + "نتیجه یافت شد";
    // searchResultDiv.appendChild(news_item);

    for (let i = 0; i < a.length; i++) {
      var source = a[i]["_source"];

      var news_item = document.createElement("div");
      news_item.className = "news_item";
      news_item.id = "item" + source["url"];

      var news_date = document.createElement("div");
      news_date.className = "news_date";
      news_date.innerHTML = "زمان انتشار" + ":" + " " + source["date"];

      var news_url = document.createElement("a");
      news_url.className = "news_url";
      news_url.innerHTML = "مشاهده خبر در خبرگزاری : " + source["url"];
      news_url.href = source["url"];
      news_url.target = "_blank";

      var news_title = document.createElement("div");
      news_title.className = "news_title";
      news_title.innerHTML = source["title"];

      var news_summary_head = document.createElement("div");
      news_summary_head.className = "text_head";
      news_summary_head.innerHTML = "خلاصه خبر";

      var news_summary = document.createElement("div");
      news_summary.className = "news_summary";
      news_summary.innerHTML = source["summary"];

      var news_text_head = document.createElement("div");
      news_text_head.className = "text_head";
      news_text_head.innerHTML = "متن کامل خبر";

      var news_text = document.createElement("div");
      news_text.className = "news_text";
      news_text.innerHTML = source["text"];

      news_item.appendChild(news_date);
      news_item.appendChild(news_url);
      if (source["summary"] != null) {
        news_item.appendChild(news_title);
      }
      if (source["summary"] != null) {
        news_item.appendChild(news_summary_head);
        news_item.appendChild(news_summary);
      }
      if (source["text"] != null) {
        news_item.appendChild(news_text_head);
        news_item.appendChild(news_text);
      }

      searchResultDiv.appendChild(news_item);
    }
  };
  render() {
    return <div id="searchResultDiv"></div>;
  }
}

export default NewsPage;
