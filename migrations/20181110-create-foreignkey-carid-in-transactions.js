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
        
>>>>>>> bf6c7c7ab52638e0c86aa8e72ca359a7b61b668c
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
};
>>>>>>> bf6c7c7ab52638e0c86aa8e72ca359a7b61b668c
