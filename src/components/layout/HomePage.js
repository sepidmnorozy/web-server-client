import React, { Component } from "react";
import "/home/momtazi/Projects/news_tracker/web/my-app/src/App.css";
//import "/home/mnoroozi/final-project/news/backend/client/src/App.css";
// import homepic from "/home/mnoroozi/final-project/news/backend/client/src/img/bg3.jpg";
class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      news_list: [],
    };
  }
  async componentDidMount() {}

  render() {
    return (
      <div className="main">
        {/* <div className="innerintro">
          <img src={homepic} id="homepic" alt="home" />
        </div> */}
        <div className="introbar">
          <p className="intro">
            خبریاب فارسی امکان دسترسی به اخبار موجود در منابع مختلف را در یک
            سایت فراهم می‌کند
          </p>
          <p></p>

          <p className="intro">
            با استفاده از لینک‌های زیر می‌توانید به مشاهده خوشه‌بندی اخبار و
            جست‌و‌جو بپردازید
          </p>
          <button className="introlist">
            <a href="/w2v"> خوشه‌بندی معنایی اخبار</a>
          </button>
          <button className="introlist">
            <a href="/tfidf"> خوشه‌بندی مبتنی بر واژه اخبار</a>
          </button>
          <button className="introlist">
            <a href="/oldsearch">جست‌وجوی اخبار با استفاده از شباهت متون</a>
          </button>
          <button className="introlist">
            <a href="/search">جست‌وجوی سریع با استفاده از موتور جست‌وجو</a>
          </button>
        </div>
      </div>
    );
  }
}

export default HomePage;
