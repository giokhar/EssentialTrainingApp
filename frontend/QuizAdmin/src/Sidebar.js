import React, { Component } from "react";
import "./Styles/Sidebar.css";
 
class Sidebar extends Component {
    
    render() {
        return (
            <div id="mainContainerSidebar">
                <div id="container">
                    <a id="menuButtons" href="HashGenerator">HashGenerator</a>
                     <a id="menuButtons" href="Courses">Courses</a>
                     <a id="menuButtons" href="QuizMaker">QuizMaker</a>
                     <a id="menuButtons" href="statistics">Statsi</a>
                     </div>
            </div>
        );
    }
}

export default Sidebar;