import React, {Component} from 'react'
import styles from './index.module.scss'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

class RichText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: this.props.articleContent
    }
  }
  handleChange = (editorState) => {
    this.props.contentUpdate(editorState.toHTML())
    this.setState({ editorState })
  }
	render () {
		return (
				<div>
           <BraftEditor value={this.state.editorState} onChange={this.handleChange} defaultValue={BraftEditor.createEditorState(this.props.defaultContent)}/>
				</div>
			)
		
	}
}
export default RichText