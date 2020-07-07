import React, {Component} from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class MarkdownEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      html:'',
      markdown:''
    }
    this.markdownEditor = React.createRef();
    this.setInitData = this.setInitData.bind(this)
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }
  setInitData(markdown) {
    this.markdownEditor.current.setText(markdown)
    // this.setState({
    //   html,
    //   markdown
    // })
  }
  handleEditorChange({html, text}) {
    this.setState({
      html,
      markdown: text
    })
  }
	render () {
		return (
      <MdEditor
      value=""
      ref={this.markdownEditor}
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={this.handleEditorChange}
      />
			)
		
	}
}
export default MarkdownEditor