import React, { Component } from "react";
import "/home/momtazi/Projects/news_tracker/web/my-app/src/App.css";
class ElasticSearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      news_list: [],
      search_keyword: "",
    };
  }
  async componentDidMount() {}

  loadSearchResults = async (a) => {
    console.log("loadSearchResults");
    var searchResultDiv = document.getElementById("searchResultDiv");
    while (searchResultDiv.hasChildNodes()) {
      searchResultDiv.removeChild(searchResultDiv.lastChild);
    }

    var news_item = document.createElement("div");
    news_item.className = "news_item_desc";
    news_item.innerHTML =
      "با توجه به متن مورد جست و جو" +
      " " +
      a.length +
      " " +
      "خبر زیر مرتبط ترین اخبار موجود در سامانه هستند";
    searchResultDiv.appendChild(news_item);
 
    var container = document.createElement("div");
    container.className = "container_result";


    for (let i = 0; i < a.length; i++) {
      var source = a[i]["_source"];

      var news_item = document.createElement("div");
      news_item.className = "news_item";
      news_item.id = "item" + source["url"];

      // var news_date = document.createElement("div");
      // news_date.className = "news_date";
      // news_date.innerHTML = source["date"];

      var news_url = document.createElement("a");
      news_url.className = "news_url";
      news_url.innerHTML = "مشاهده خبر در خبرگزاری";
      news_url.href = source["url"];
      news_url.target = "_blank";


      var news_title = document.createElement("div");
      news_title.className = "news_title";
      news_title.innerHTML = "عنوان خبر : " + "\n\n\n" + source["title"];

      // var news_summary_head = document.createElement("div");
      // news_summary_head.className = "news_summary_head";
      // news_summary_head.innerHTML = "This is summary";

      // var news_summary = document.createElement("div");
      // news_summary.className = "news_summary";
      // news_summary.innerHTML = source["summary"];

      // var news_text_head = document.createElement("div");
      // news_text_head.className = "news_texty_head";
      // news_text_head.innerHTML = "This is Text";

      // var news_text = document.createElement("div");
      // news_text.className = "news_text";
      // news_text.innerHTML = source["text"];

      var oda = document.createElement("a");
      oda.className = "show_text_butt";
      oda.id = source["url"];
      oda.href = "/newsPage";
      oda.target = "_blank";
      oda.onclick = this.reply_click;
      oda.onmousedown = this.reply_click;
      oda.innerHTML = "نمایش جزئیات";

      // news_item.appendChild(news_date);
      news_item.appendChild(news_url);
      if (source["title"] != null) {
        news_item.appendChild(news_title);
      }
      // if (source["summary"] != null) {
      //   news_item.appendChild(news_summary_head);
      //   news_item.appendChild(news_summary);
      // }
      // if (source["text"] != null) {
      //   news_item.appendChild(news_text_head);
      //   news_item.appendChild(news_text);
      // }
      news_item.appendChild(oda);
      container.appendChild(news_item);
    }
    searchResultDiv.appendChild(container);
  };

  reply_click = (event) => {
    // console.log(event.target.id);
    localStorage.setItem("newsid", event.target.id);
  };

  handleChange = (event) => {
    console.log("oomad to change");
    this.setState({ search_keyword: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("oomad to submit");
    var searchResultDiv = document.getElementById("searchResultDiv");
    while (searchResultDiv.hasChildNodes()) {
      searchResultDiv.removeChild(searchResultDiv.lastChild);
    }
    var search_none = document.createElement("div");
    search_none.className = "news_item_desc";
    search_none.innerHTML =
      "نتیجه جست و جو در حال بارگذاری است لطفا صبور باشید" + "\n";
    searchResultDiv.appendChild(search_none);
    console.log("Nothingggggggggggggggggggggggggggggggggggggg");
    const data = { input: this.state.search_keyword };
    var time = new Date().toLocaleString();
    console.log(time);
    var result = await fetch(
      "http://gw.ceit.aut.ac.ir:50052/documents/suggest/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log("oooooooooo");
    time = new Date().toLocaleString();
    console.log(time);
    let jsonRes = await result.text();
    let finalResult = await JSON.parse(jsonRes);
    console.log(finalResult);
    // console.log(finalResult.hits.hits);
    // console.log(finalResult.hits.total.value);
    var numofhits = finalResult.hits.total.value;
    if (numofhits > 0) {
      console.log("haaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhh");
      await this.loadSearchResults(finalResult.hits.hits);
    } else {
      var searchResultDiv = document.getElementById("searchResultDiv");
      while (searchResultDiv.hasChildNodes()) {
        searchResultDiv.removeChild(searchResultDiv.lastChild);
      }
      var search_none = document.createElement("div");
      search_none.className = "news_item_desc";
      search_none.innerHTML = "متاسفم خبری یافت نشد" + "\n";
      searchResultDiv.appendChild(search_none);
      console.log("Nothingggggggggggggggggggggggggggggggggggggg");
    }

    // await this.loadSearchResults(searchnews);
  };
  render() {
    return (
      <div id="maindiv">
        <div id="inputSearchDiv">
          <form className="searchform" onSubmit={this.handleSubmit}>
            <p>عبارت مورد جست و جو را وارد کنید و سپس کلید ثبت را بزنید</p>
            <div className="searchdiv">
              <input
                className="searchinput"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />

              <input className="searchsubmit" type="submit" value="ثبت" />
            </div>
          </form>
        </div>
        <div id="searchResultDiv"></div>
      </div>
    );
  }
}

export default ElasticSearchComponent;
