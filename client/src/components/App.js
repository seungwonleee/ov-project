import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

// 라우팅용 pages
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
import VideoSharePage from './views/VideoSharePage/VideoSharePage';
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
import Subscriptionpage from './views/SubscriptionPage/Subscriptionpage';

//null   아무나 접근가능
//true   로그인 한사람만 접근 가능
//false  로그인 안한사람 접근 불가

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/video/share" component={Auth(VideoSharePage, null)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/subscription" component={Auth(Subscriptionpage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;