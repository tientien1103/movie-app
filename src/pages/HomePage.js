import React from "react";
import useAuth from "../hooks/useAuth";
import Banner from "../components/Banner";
import requests from "../components/Requests";
import List from "../components/List";

function HomePage() {
  const auth = useAuth();
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }
  return (
    <div>
      <Banner />
      <List
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        id="NETFLIXORIGINALS"
      />
      <List
        id="TrendingNow"
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
        isLargeRow
      />
      <List id="TVMovies" title="TV Movies" fetchUrl={requests.fetchTVMovies} />
      <List id="TopRated" title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <List
        id="ActionMovies"
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <List
        id="AnimationMovies"
        title="Animation Movies"
        fetchUrl={requests.fetchAnimationMovies}
      />
      <List
        id="ComedyMovies"
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <List
        id="HorrorMovies"
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
    </div>
  );
}

export default HomePage;
