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
                <img onClick={() => this.addKittenToRandomGroup(kitten, group)} src={kitten.pictureUrl} />
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

  addKittenToRandomGroup (kitten, currentGroup) {
    const newGroup = this.props.groups.allGroups.sort(() => Math.random() - 0.5)[0]
    this.props.mutations.removeKittenFromGroup(kitten, currentGroup)
    .then(() => this.props.mutations.addKittenToGroup(kitten, newGroup))
    .then(() => this.props.groups.refetch())
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
            id
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
      addKittenToGroup: (kitten, group) => ({
        mutation: gql`
        mutation addToGroup($kittenId: ID!, $groupId: ID!) {
          addKittenTokittensConnectionOnGroup(
            fromId: $groupId,
            toId: $kittenId
          ) { id }
        }
        `,
        variables: {
          kittenId: kitten.id,
          groupId: group.id,
        },
      }),
      removeKittenFromGroup: (kitten, group) => ({
        mutation: gql`
        mutation removeFromGroup($kittenId: ID!, $groupId: ID!) {
          removeKittenFromkittensConnectionOnGroup(
            fromId: $groupId,
            toId: $kittenId
          ) { id }
        }
        `,
        variables: {
          kittenId: kitten.id,
          groupId: group.id,
        },
      }),
    }
  },
})(App)

export default AppLinked
