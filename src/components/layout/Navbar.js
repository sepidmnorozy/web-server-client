import React, { Component } from "react";
import "/home/momtazi/Projects/news_tracker/web/my-app/src/App.css";
//import "/home/mnoroozi/final-project/news/backend/client/src/App.css";
class Navbar extends Component {
  render() {
    return (
      <div class="topnav">
        <div class="haha">
          <a href="/"> صفحه اصلی </a>
          <a href="/w2v"> تشخیص معنایی اخبار مشابه</a>
          <a href="/tfidf"> تشخیص واژگانی اخبار مشابه </a>
          <a href="/search"> جست‌و‌جو </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
