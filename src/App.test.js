import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NavBar, ToDo, and Footer components', () => {
  render(<App />);

  // Verifica se o título "Task to do" do NavBar é renderizado
  const navBarElement = screen.getByText(/task to do/i);
  expect(navBarElement).toBeInTheDocument();

  // Verifica se o texto "Add New Task" do ToDo é renderizado
  const todoElement = screen.getByText(/add new task/i);
  expect(todoElement).toBeInTheDocument();

  // Verifica se o rodapé com "Developed by Vinícius Dias" é renderizado
  const footerElement = screen.getByText((content, element) => {
    return content.startsWith('Developed by') && element.tagName.toLowerCase() === 'p';
  });
  expect(footerElement).toBeInTheDocument();
});