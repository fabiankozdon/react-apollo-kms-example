import React, {PropTypes} from 'react'

import { connect } from 'react-apollo'

class App extends React.Component {
  static propTypes = {
    mutations: PropTypes.object.isRequired,
    kittens: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
  }

  renderAll () {
    const kittens = this.props.kittens.allKittens || []

    return (
      <div>
        {kittens.map((kitten) =>
          <div>
            <img src={kitten.pictureUrl} />
            <div>{kitten.name}</div>
          </div>
        )}
      </div>
    )
  }

  renderGroups () {
    const groups = this.props.groups.allGroups || []

    return (
      <div>
        {groups.map((group) =>
          <div style={{float: 'left', margin: 5}}>
            <b>{group.name}</b>
            {group.kittens.map((kitten) =>
              <div>
                <img src={kitten.pictureUrl} />
                <div>{kitten.name}</div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  renderGroupsWithMutation () {
    const groups = this.props.groups.allGroups || []

    return (
      <div>
        {groups.map((group) =>
          <div className='column'>
            <b>{group.name}</b>
            {group.kittens.map((kitten) =>
              <div>
                <img src={kitten.pictureUrl} />
                <input type='text'
                  defaultValue={kitten.name}
                  onBlur={(e) => this.saveNewName(kitten, e.target.value)} />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  saveNewName (kitten, name) {
    this.props.mutations.renameKitten(kitten, name)
  }

  render () {
    // return this.renderAll()
    // return this.renderGroups()
    return this.renderGroupsWithMutation()
  }
}

const AppLinked = connect({
  mapQueriesToProps () {
    return {
      kittens: {
        query: gql`
        {
          allKittens{
            id
            name
            pictureUrl
          }
        }
        `,
      },
      groups: {
        query: gql`
        {
          allGroups{
            name
            kittens{
              id
              name
              pictureUrl
            }
          }
        }
        `,
      },
    }
  },
  mapMutationsToProps () {
    return {
      renameKitten: (kitten, name) => ({
        mutation: gql`
        mutation renameKitten($id: ID!, $name: String!) {
          updateKitten(id: $id, name: $name) {id}
          }
        `,
        variables: {
          id: kitten.id,
          name: name,
        },
      }),
    }
  },
})(App)

export default AppLinked
