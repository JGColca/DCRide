'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.addColumn(
            'Transactions',
            'carid',{
                type : Sequelize.INTEGER,
                allowNull : false,
                model: 'Cars',
                key: 'id'
            }
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
        
>>>>>>> bf6c7c7ab52638e0c86aa8e72ca359a7b61b668c
>>>>>>> 5656b853d6eca027f3ac8c0e265d972a0c8e4ea0
        )

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Transactions',
            'userid'
        );

    }
<<<<<<< HEAD
};
=======
<<<<<<< HEAD
};
=======
};
>>>>>>> bf6c7c7ab52638e0c86aa8e72ca359a7b61b668c
>>>>>>> 5656b853d6eca027f3ac8c0e265d972a0c8e4ea0
