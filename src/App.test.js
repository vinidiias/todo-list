import { render, screen } from '@testing-library/react';
import App from './App'; // Supondo que você está importando o componente App
import { UserContext } from '../src/Context/UserContext'; // Certifique-se de importar o contexto
import React from 'react';

const mockUserData = {
    isLogged: true,
    name: 'Vinícius',
    user_id: '12345',
};

test('renders NavBar, ToDo, and Footer components', () => {
    render(
        <UserContext.Provider value={[mockUserData]}>
            <App />
        </UserContext.Provider>
    );

    // Verifique se os componentes estão sendo renderizados
    expect(screen.getByText(/Task to do/i)).toBeInTheDocument();
    // Ajuste para os textos do seu ToDo e Footer
});
