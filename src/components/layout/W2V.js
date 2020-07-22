import React, { Component } from "react";
import "/home/momtazi/Projects/news_tracker/web/my-app/src/App.css";
//import "/home/mnoroozi/final-project/news/backend/client/src/App.css";
export const breakline = "\u000A";
class W2V extends Component {
  constructor() {
    super();
    this.state = {
      news_list: [],
      search_keyword: "",
    };
  }
  async componentDidMount() {
    console.log("getting results... please wait");
    var result = await fetch(
      "http://gw.ceit.aut.ac.ir:50052/api/news/w2vclusters",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Yeeees got clusters");
    let jsonRes = await result.text();
    let finalResult = await JSON.parse(jsonRes);
    var searchnews = finalResult;
    await this.loadclusters(searchnews);
  }
  loadclusters = async (a) => {
    console.log("load clusters");
    console.log("len of a");
    console.log(a.length);
    // console.log("first type of cluster");
    // console.log(a[0].length);
    // console.log(a[0]);
    // console.log("first cluster");
    // console.log(a[0][0]);
    // console.log("news in this cluster");
    // console.log(a[0][0]["list"]);
    // console.log("second type of cluster");
    // console.log(a[1].length);
    // console.log(a[1]);
    // console.log("first cluster");
    // console.log(a[1][0]);
    // console.log("news in this cluster");
    // console.log(a[1][0]["list"]);

    var maindiv = document.getElementsByClassName("maindiv")[0];
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.lastChild);
    }
    // var news_container = document.getElementsByClassName("news_container");
    // for (let i = 0; i < news_container.length; i++) {
    //   maindiv.removeChild(news_container[i]);
    // }
    // console.log("there is news_container");
    // maindiv.removeChild(news_container);

    // var news_container = document.getElementsByClassName("news_container")[0];
    var news_clusters = document.createElement("div");
    news_clusters.className = "news_clusters";

    //sort a[i]ha

    for (let i = 0; i < a.length; i++) {
      var clusters = a[i];
      var cluster_type = document.createElement("div");
      cluster_type.className = "news_item_desc";
      cluster_type.innerHTML =
        "دسته بندی اخبار مشابه از دیروز تا به الان به صورت زیر است" +
        "\n" +
        "تعداد خوشه ها :‌" +
        clusters.length;
      news_clusters.appendChild(cluster_type);

      // console.log(clusters[1]);
      for (let j = 0; j < clusters.length; j++) {
        var news_list = clusters[j]["list"];
        var cluster_desc = document.createElement("div");
        cluster_desc.className = "cluster_desc";
        var k = j + 1;
        cluster_desc.innerHTML =
          "<div>" +
          "خوشه شماره" +
          "&nbsp;" +
          k +
          "</div>" +
          "<div>" +
          "تعداد اخبار" +
          ":" +
          " " +
          news_list.length +
          "</div>";
	news_clusters.appendChild(cluster_desc);
        if (news_list.length == 1) {
          var cluster = document.createElement("div");
          cluster.className = "cluster_1";
          cluster.id = "cluster" + j;
        } else if (news_list.length == 2) {
          var cluster = document.createElement("div");
          cluster.className = "cluster_2";
          cluster.id = "cluster" + j;
        } else {
          var cluster = document.createElement("div");
          cluster.className = "cluster_3";
          cluster.id = "cluster" + j;
        }
        //var k = j + 1;
        //cluster.innerHTML =
         // "<div>" +
          //"خوشه شماره" +
         // "&nbsp;" +
         // k +
         // "</div>" +
         // "<div>" +
         // "تعداد اخبار" +
          //":" +
          //" " +
          //news_list.length +
         // "</div>";
        // console.log("yay");

        // console.log("cluster number" + j);
        // console.log(news_list.length);
        for (let k = 0; k < news_list.length; k++) {
          var news_item = document.createElement("div");
          news_item.className = "news_item";
          news_item.id = "item" + news_list[k][0];

          // var news_date = document.createElement("div");
          // news_date.className = "news_date";
          // news_date.innerHTML = news_list[k]["date"];

          var news_url = document.createElement("a");
          news_url.className = "news_url";
          news_url.innerHTML = "مشاهده خبر در خبرگزاری";
          news_url.href = news_list[k][0];
          news_url.target = "_blank";

          var news_title = document.createElement("div");
          news_title.className = "news_title";
          news_title.innerHTML = "عنوان خبر" + ":" + " " + news_list[k][1];
          var oda = document.createElement("a");
          oda.className = "show_text_butt";
          oda.id = news_list[k][0];
          oda.href = "/newsPage";
          oda.target = "_blank";
          oda.onclick = this.reply_click;
          oda.onmousedown = this.reply_click;
          oda.innerHTML = "نمایش جزئیات";
          // var news_title = document.createElement("div");
          // news_title.className = "news_title";
          // news_title.innerHTML = news_list[k]["title"];

          // var news_summary_head = document.createElement("div");
          // news_summary_head.className = "news_summary_head";
          // news_summary_head.innerHTML = "This is summary";

          // var news_summary = document.createElement("div");
          // news_summary.className = "news_summary";
          // news_summary.innerHTML = news_list[k]["summary"];

          // var news_text_head = document.createElement("div");
          // news_text_head.className = "news_texty_head";
          // news_text_head.innerHTML = "This is Text";

          // var news_text = document.createElement("div");
          // news_text.className = "news_text";
          // news_text.innerHTML = news_list[k]["text"];

          // news_item.appendChild(news_date);
          news_item.appendChild(news_url);
          news_item.appendChild(news_title);
          // if (news_list[k]["summary"] != null) {
          //   news_item.appendChild(news_summary_head);
          //   news_item.appendChild(news_summary);
          // }
          // if (news_list[k]["text"] != null) {
          //   news_item.appendChild(news_text_head);
          //   news_item.appendChild(news_text);
          // }
          news_item.appendChild(oda);
          cluster.appendChild(news_item);
        }
        news_clusters.appendChild(cluster);
      }
    }
    maindiv.appendChild(news_clusters);
  };
  reply_click = (event) => {
    // console.log(event.target.id);
    localStorage.setItem("newsid", event.target.id);
  };

  render() {
    return (
      <div className="maindiv">
        <div className="news_item_wait">
          این صفحه در حال بارگذاری است لطفا صبر کنید
        </div>
      </div>
    );
  }
}

export default W2V;
