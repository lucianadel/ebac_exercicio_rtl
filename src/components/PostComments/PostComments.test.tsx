/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// src/components/PostComments/PostComments.test.tsx (CÓDIGO COMPLETO)

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para usar o .toBeInTheDocument()
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    // Mantemos o teste original que verifica a renderização
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    // NOVO TESTE: Verifica a inserção de dois comentários
    it('Deve inserir dois comentários com sucesso', async () => {
        render(<PostComment/>);
        
        // 1. Localiza os elementos usando os data-testid
        // Nota: O seu componente Post está exportado como 'Post', 
        // mas é importado como 'PostComment' no teste. Está ok, mas é bom notar.
        const textarea = screen.getByTestId('comment-textarea');
        const submitButton = screen.getByTestId('submit-button');

        // --- 1º COMENTÁRIO ---
        const comentario1 = 'Comentário #1: Teste de Inserção.';
        fireEvent.change(textarea, { target: { value: comentario1 } });
        fireEvent.click(submitButton);

        // 2. Verifica se o 1º comentário aparece
        // O waitFor é importante pois o estado (useState) pode atualizar de forma assíncrona.
        await waitFor(() => {
            expect(screen.getByText(comentario1)).toBeInTheDocument();
        });

        // --- 2º COMENTÁRIO ---
        const comentario2 = 'Comentário #2: Confirmação de lista.';
        fireEvent.change(textarea, { target: { value: comentario2 } });
        fireEvent.click(submitButton);

        // 3. Verifica se o 2º comentário aparece E se o 1º ainda está lá
        await waitFor(() => {
            expect(screen.getByText(comentario2)).toBeInTheDocument();
            expect(screen.getByText(comentario1)).toBeInTheDocument();
        });
    });
});
