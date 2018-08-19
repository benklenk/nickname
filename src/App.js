import React, {Component} from 'react';
import Button from '@material-ui/core/Button'

class App extends Component {
  constructor(props) {
    super(props);
    // all the suffixes are hard coded and used to find rhymes in the findRHyme()
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
    // binding all function to this
    this.findRhyme = this.findRhyme.bind(this)
    this.noSpaces = this.noSpaces.bind(this)
    this.onClick = this.onClick.bind(this)
    this.pickRhyme = this.pickRhyme.bind(this)
  }

  //3. pickRhyme chooses a random rhyme from this.state.rhymes
  pickRhyme() {
    return this.state.rhymes[Math.floor(Math.random() * this.state.rhymes.length)]
  }

  //3.5. noSpaces checks if the rhyme picked by pickRhyme() is good (specifically if it is a near/perfect rhyme && if it has flags that RhymeBrain uses to determine if a return value is pronoucable && common). If it is not, noSpaces calls pickRhyme() again to find a new rhyming word. noSpaces then sets the rhyme state and sets the this.state.loading to FALSE
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

  // 1. onClick selects which suffix to use, calls findRhyme(), and sets state of the button and loading states
  onClick() {
    let suffix = this.state.suffix[Math.floor(Math.random() * this.state.suffix.length)]
    this.findRhyme(suffix)
    this.setState({loading: true})
    this.setState({button: 'Gimme Another'})
  }


  // 2. findRhyme gets a JSON of all rhymes associated with the suffix passed in, and setsState({rhymes: JSON}) and calls noSpaces() to find a good rhyme. findRhyme() then edits displaySuffix so everything looks nice on the front end
  findRhyme(suffix) {
    fetch('http://rhymebrain.com/talk?function=getRhymes&word=' + suffix, {
      credentials: 'same-origin'
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
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }} className="App"><br/>
        {/* CSS is changed depending of if this.state.loading is TRUE, when it is the results are hidden and the button is disabled to prevent multiple requests from the user before the first loads */}
        <h1 className="Butter" style={this.state.loading
            ? {
              color: 'transparent',
              textShadow: "0 0 5px rgba(0,0,0,0.5)",
              display: 'inline',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '7em'
            }
            : {
              display: 'inline',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '7em'
            }}>Dest{this.state.displaySuffix} {this.state.rhyme}</h1>
        <br/>
      </div>
      <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Button disabled={this.state.loading} color='inherit' onClick={this.onClick} size='large' variant='contained'>{this.state.button}</Button>
      </div>
    </div>);
  }
}

export default App;
