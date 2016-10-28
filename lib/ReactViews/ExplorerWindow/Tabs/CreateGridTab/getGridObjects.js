module.exports = function (){
  return {
    gridType: [
            {
                value: 'beckerhagens',
                name: 'Beckerhagens'
            },
            {
                value: 'cube',
                name: 'Cube'
            },
            {
                value: 'dodecahedron',
                name: 'Dodecahedron'
            },
            {
                value: 'icosahedron',
                name: 'Icosahedron'
            },
            {
                value: 'octahedron',
                name: 'Octahedron'
            },
            {
                value: 'tetrahedron',
                name: 'Tetrahedron'
            }
        ]
    gridLevel: [
            {
                value: 'points',
                name: 'Points'
            },
            {
                value: '1',
                name: 'Main Lines'
            },
            {
                value: '2',
                name: 'Minor Lines'
            },
            {
                value: 'area',
                name: 'Areas'
            },
        ]
    gridMatrix: {
            {
                beckerhagens: ['points', '1', '2', 'area'],
                cube: ['points', '1', '2', 'area'],
                dodecahedron: ['points', '1', '2', 'area'],
                icosahedron: ['points', '1', '2', 'area'],
                octahedron: ['points', '1', '2', 'area'],
                tetrahedron: ['points', '1', '2', 'area']
            }
         }
    };
};

