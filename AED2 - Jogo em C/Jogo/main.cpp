#include <SDL.h>
#include "SDL_opengl.h"
#include <stdio.h>

int main(int argc, char* args[])
{

    SDL_Init(SDL_INIT_EVERYTHING);




        //Nome da janela
        SDL_WM_SetCaption("Space invaders", NULL);

        //Tamanho da janela
        SDL_SetVideoMode(600,400,32, SDL_OPENGL);

        //cor inicial da janela
        glClearColor(1,1,1,1);

        //area exibida
        glViewport(0,0,600,400);

        //sombra
        glShadeModel(GL_SMOOTH);

        //2D
        glMatrixMode(GL_PROJECTION);
        glLoadIdentity();

        //3d
        glDisable(Gl_DEPTH_TEST);

        //Render
        glClear(GL_COLOR_BUFFER_BIT);//limpa o buffer

        //animacao
        SDL_GL_SwapBuffers();



    glDisable(GL_BLEND);

    SDL_Delay(5000);

    SDL_Quit();

    return 0;
}
