//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import balls from "./balls.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
    state = {
        balls,
        clickedBalls: [],
        score: 0
    };

    //when you click on a card ... the ball is taken out of the array
    imageClick = event => {
        const currentBalls = event.target.alt;
        const BallsAlreadyClicked =
            this.state.clickedBalls.indexOf(currentBalls) > -1;

        //if you click on a ball that has already been selected, the game is reset and cards reordered
        if (BallsAlreadyClicked) {
            this.setState({
                balls: this.state.balls.sort(function (a, b) {
                    return 0.5 - Math.random();
                }),
                clickedBalls: [],
                score: 0
            });
            alert("You lose. Play again?");

            //if you click on an available ball your score is increased and cards reordered
        } else {
            this.setState(
                {
                    balls: this.state.balls.sort(function (a, b) {
                        return 0.5 - Math.random();
                    }),
                    clickedBalls: this.state.clickedBalls.concat(
                        currentBalls
                    ),
                    score: this.state.score + 1
                },
                //if you get all 12 balls corrent you get a congrats message and the game resets        
                () => {
                    if (this.state.score === 12) {
                        alert("You Win!");
                        this.setState({
                            balls: this.state.balls.sort(function (a, b) {
                                return 0.5 - Math.random();
                            }),
                            clickedBalls: [],
                            score: 0
                        });
                    }
                }
            );
        }
    };

    //the order of components to be rendered: navbar, jumbotron, friendcard, footer 
    render() {
        return (
            <div>
                <Navbar
                    score={this.state.score}
                />
                <Jumbotron />
                <div className="wrapper">
                    {this.state.fish.map(fish => (
                        <FriendCard
                            imageClick={this.imageClick}
                            id={balls.id}
                            key={balls.id}
                            image={balls.image}
                        />
                    ))}
                </div>
                <Footer />
            </div>
        );
    }
}
export default App;