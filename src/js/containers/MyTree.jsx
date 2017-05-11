import React from 'react'

class MyTree extends React.Component {
  constructor() {
    super()

    this.datas = [{
      id: 'root',
      name: 'Root',
      children: [
        {
          id: 'etc',
          name: 'etc',
        }, {
          id: 'dev',
          name: 'dev',
          children: [
            {
              id: 'sda',
              name: 'sda'
            }
          ]
        }
      ]
    }]
  }

  nodeOnClick(data) {
    console.log(data)
  }

  renderTree(datas, level) {
    return datas.map((data) => {
      return (
        <div>
          <div id='tree-${level}' onClick={() => this.nodeOnClick(data)}>
            {data.name} - {level}
            {data.children && this.renderTree(data.children, ++level)}
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderTree(this.datas, 0)}
      </div>
    )
  }
}


export default MyTree;
