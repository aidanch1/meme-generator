import React from "react"

class MemeGenerator extends React.Component {
    constructor(){
        super()
        this.state = {
            toptext: "",
            bottomtext: "",
            image: "",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.changeImage = this.changeImage.bind(this)
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(
                response => {this.setState({
                    image: response.data.memes[0].url,
                    allMemeImgs: response.data.memes
                })}
            )
    }
    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    changeImage(){
        let r = Math.floor(Math.random()*this.state.allMemeImgs.length)
        let url = this.state.allMemeImgs[r].url
        this.setState({
            image: url
        })
    }
    render(){
        return (
            <div>
                <form>
                    <input type="text" name="toptext" value={this.state.toptext} placeholder="top text" onChange={this.handleChange}></input>
                    <input type="text" name="bottomtext" value={this.state.bottomtext} placeholder="bottom text" onChange={this.handleChange}></input>
                    <button type="button" onClick={this.changeImage}>Gen</button>
                </form>
                <div className="meme-container">
                    <h2 className="meme-toptext">{this.state.toptext}</h2>
                    <img src={this.state.image} alt=""></img>
                    <h2 className="meme-bottomtext">{this.state.bottomtext}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator