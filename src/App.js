import React, {Component} from 'react';
import Button from '@material-ui/core/Button'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suffix: [
        'ito',
        'toni',
        'teeny',
        'testy',
        'destino',
        'eeti',
        'torni',
        'desteet'
      ],
      displaySuffix: 'in',
      rhyme: '',
      rhymes: '',
      loading: false,
      button: 'Generate a Nickname'
    }
    this.findRhyme = this.findRhyme.bind(this)
    this.noSpaces = this.noSpaces.bind(this)
    this.onClick = this.onClick.bind(this)
    this.pickRhyme = this.pickRhyme.bind(this)
  }

  pickRhyme() {
    return this.state.rhymes[Math.floor(Math.random() * this.state.rhymes.length)]
  }

  noSpaces(suffix) {
    let rhyme = this.pickRhyme()
    while (rhyme.score < 263 || rhyme.flags !== 'bc') {
      rhyme = this.pickRhyme()
    }
    this.setState({
      rhyme: 'the ' + rhyme.word.charAt(0).toUpperCase() + rhyme.word.slice(1)
    })
    this.setState({loading: false})
  }

  onClick() {
    let suffix = this.state.suffix[Math.floor(Math.random() * this.state.suffix.length)]
    this.findRhyme(suffix)
    this.setState({loading: true})
    this.setState({button: 'Gimme Another'})
  }

  findRhyme(suffix) {
    fetch('//rhymebrain.com/talk?function=getRhymes&word=' + suffix, {
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }).then(rhymes => {
      return rhymes.json()
    }).then(json => {
      this.setState({rhymes: json})
      this.noSpaces(suffix)
    }).catch(error => console.log('@@@@@@ ' + error));
    if (suffix === 'destin') {
      this.setState({displaySuffix: 'in'})
    } else if (suffix === 'testy') {
      this.setState({displaySuffix: 'y'})
    } else if (suffix === 'teeny') {
      this.setState({displaySuffix: 'ini'})
    } else if (suffix === 'toni') {
      this.setState({displaySuffix: 'oni'})
    } else if (suffix === 'destino') {
      this.setState({displaySuffix: 'ino'})
    } else if (suffix === 'eeti') {
      this.setState({displaySuffix: 'iti'})
    } else if (suffix === 'torni') {
      this.setState({displaySuffix: 'orni'})
    } else if (suffix === 'desteet') {
      this.setState({displaySuffix: 'eet'})
    } else {
      this.setState({displaySuffix: suffix})
    }
  }

  render() {
    return (<div>
      <div style={{
          backgroundColor: 'lightGrey',
          height: '100%',
          display: 'flex',
          justifyContent: 'center'
        }} className="App"><br/>
        <h1 className="Butter" style={this.state.loading
            ? {
              color: 'transparent',
              textShadow: "0 0 5px rgba(0,0,0,0.5)",
              display: 'inline',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '9em'
            }
            : {
              display: 'inline',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '9em'
            }}>Dest{this.state.displaySuffix} {this.state.rhyme}</h1>
        <br/>
      </div>
      <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Button disabled={this.state.loading} color='primary' onClick={this.onClick} size='large' variant='contained'>{this.state.button}</Button>
      </div>
    </div>);
  }
}

export default App;
