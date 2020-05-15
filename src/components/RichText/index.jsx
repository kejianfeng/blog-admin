import React, {Component} from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'


class RichText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: this.props.articleContent
    }
    this.getInitialState = this.getInitialState.bind(this)
  }
  getInitialState(value) {
    this.setState({
      editorState: BraftEditor.createEditorState(value)
    })
  }
  handleChange = (editorState) => {
    this.props.contentUpdate(editorState.toHTML())
    this.setState({ editorState })
  }
	render () {
		return (
				<div>
           <BraftEditor value={this.state.editorState} onChange={this.handleChange}/>
				</div>
			)
		
	}
}
export default RichText