import React, { Component } from "react";
import "/home/momtazi/Projects/news_tracker/web/my-app/src/App.css";
//import "/home/mnoroozi/final-project/news/backend/client/src/App.css";
class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      news_list: [],
      search_keyword: "",
    };
  }
  async componentDidMount() {
    // await this.initilize_news();
  }
  loadSearchResults = async (a) => {
    // loadSearchResults(a) {
    console.log("loadSearchResults");
    var searchResultDiv = document.getElementById("searchResultDiv");
    while (searchResultDiv.hasChildNodes()) {
      searchResultDiv.removeChild(searchResultDiv.lastChild);
    }

    // var news_container = document.getElementsByClassName("news_container")[0];

    var search_text = document.createElement("div");
    search_text.className = "news_item_desc";
    search_text.innerHTML =
      "متن مورد جست و جو" + ":" + " " + a[0]["search_text"] + "\n";
    searchResultDiv.appendChild(search_text);
    for (let i = 0; i < a.length; i++) {
      var search_type = document.createElement("div");
      search_type.className = "news_item_desc";
      search_type.innerHTML = " روش جست و جو" + ":" + "" + a[i]["type"] + "\n";
      searchResultDiv.appendChild(search_type);
      var list = a[i]["result"];
      for (let i = 0; i < list.length; i++) {
        var news_item = document.createElement("div");
        news_item.className = "news_item";
        news_item.id = "item" + list[i]["url"];

        // var news_date = document.createElement("div");
        // news_date.className = "news_date";
        // news_date.innerHTML = list[i]["date"];

        var news_url = document.createElement("div");
        news_url.className = "news_url";
        news_url.innerHTML = list[i]["url"];

        var news_title = document.createElement("div");
        news_title.className = "news_title";
        news_title.innerHTML = list[i]["title"];

        // var news_summary_head = document.createElement("div");
        // news_summary_head.className = "news_summary_head";
        // news_summary_head.innerHTML = "This is summary";

        // var news_summary = document.createElement("div");
        // news_summary.className = "news_summary";
        // news_summary.innerHTML = list[i]["summary"];

        // var news_text_head = document.createElement("div");
        // news_text_head.className = "news_texty_head";
        // news_text_head.innerHTML = "This is Text";

        // var news_text = document.createElement("div");
        // news_text.className = "news_text";
        // news_text.innerHTML = list[i]["text"];

        var oda = document.createElement("a");
        oda.className = "show_text_butt";
        oda.id = list[i]["url"];
        oda.href = "/newsPage";
        oda.target = "_blank";
        oda.onclick = this.reply_click;

        oda.innerHTML = "نمایش صفحه خبر";

        // news_item.appendChild(news_date);
        news_item.appendChild(news_url);
        if (list[i]["title"] != null) {
          news_item.appendChild(news_title);
        }
        // if (list[i]["summary"] != null) {
        //   news_item.appendChild(news_summary_head);
        //   news_item.appendChild(news_summary);
        // }
        // if (list[i]["text"] != null) {
        //   news_item.appendChild(news_text_head);
        //   news_item.appendChild(news_text);
        // }
        news_item.appendChild(oda);
        searchResultDiv.appendChild(news_item);
      }
    }
    // searchResultDiv.appendChild(news_container);
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
    const data = { text: this.state.search_keyword };
    var time = new Date().toLocaleString();
    console.log(time);
    var result = await fetch("http://gw.ceit.aut.ac.ir:50052/api/news/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("oooooooooo");
    time = new Date().toLocaleString();
    console.log(time);
    let jsonRes = await result.text();
    let finalResult = await JSON.parse(jsonRes);
    var searchnews = finalResult;
    await this.loadSearchResults(searchnews);
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

export default Searchbar;
