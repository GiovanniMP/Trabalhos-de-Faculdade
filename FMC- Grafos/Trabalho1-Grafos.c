#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <locale.h>
#include <string.h>

typedef struct lista{

    int vertice;
    int pesos;
    struct lista *proximo;
}Lista;

typedef struct Privertice{
    Lista *PrimeiroVertice;

}Vertice;

typedef struct grafo{

    int numVertices;
    Vertice *aresta;

}Grafo;

Grafo *criaGrafo(int numVertices);
Lista *criaLista(int vFinal, int pesos);
int geraAresta(Grafo *grafo, int vertInicial, int vertFinal, int pesos);
void SomaArestas(Grafo *grafo, int *Distancia , int PVertice, int ProxVertice);
int *dijkstra(Grafo *grafo,int Inicial);
int VerificaAberto(Grafo *grafo, int *aberto);
int menorDistancia(Grafo *grafo, int *aberto, int *Distancia);
void MostraListaAdj(Grafo *grafo);

    int main(){

        setlocale(LC_ALL, "Portuguese");
        Grafo *grafo = criaGrafo(9);
        //Vertice 1 para 2 e 2 para 1
        geraAresta(grafo,0,1,7);
        //Vertice 1 para 4 e 4 para 1
        geraAresta(grafo,0,3,9);
        //Vertice 2 para 3 e 3 para 2
        geraAresta(grafo,1,2,4);
        //Vertice 2 para 5 e 5 para 2
        geraAresta(grafo,1,4,18);
        //Vertice 3 para 6 e 6 para 3
        geraAresta(grafo,2,5,9);
        //Vertice 4 para 5 e 5 para 4
        geraAresta(grafo,3,4,8);
        //Vertice 4 para 7 e 7 para 4
        geraAresta(grafo,3,6,14);
        //Vertice 5 para 6 e 6 para 5
        geraAresta(grafo,4,5,7);
        //Vertice 5 para 7 e 7 para 5
        geraAresta(grafo,4,6,15);
        //Vertice 5 para 8 e 8 para 5
        geraAresta(grafo,4,7,10);
        //Vertice 5 para 9 e 9 para 5
        geraAresta(grafo,4,8,7);
        //Vertice 6 para 9 e 9 para 5
        geraAresta(grafo,5,8,3);
        //Vertice 7 para 8 e 8 para 7
        geraAresta(grafo,6,7,10);
        //Vertice 8 para 9 e 9 para 8
        geraAresta(grafo,7,8,9);

        printf("\n************************************Instruções para realizar pesquisas no grafo************************************\n\n");
        printf("Cada aeroporto é representado por um número diferente(Vértice)\n");
        printf("O aeroporto de GUARULHOS é representado pelo número 1\n");
        printf("O aeroporto do PANAMÁ é representado pelo número 2\n");
        printf("O aeroporto de ATLANTA é representado pelo número 3\n");
        printf("O aeroporto do JOANESBURGO é representado pelo número 4\n");
        printf("O aeroporto de DUBAI é representado pelo número 5\n");
        printf("O aeroporto de LONDRES é representado pelo número 6\n");
        printf("O aeroporto de SYDNEY é representado pelo número 7\n");
        printf("O aeroporto de TÓQUIO é representado pelo número 8\n");
        printf("O aeroporto de MOSCOU é representado pelo número 9\n\n\n");

        int partida, destino,*TempoVoo;
        char NomedoAeroP[15],NomedoAeroD[15];

        Pergunta1:
        printf("O voo está partindo de qual Aeroporto? Números validos são de 1 a 9\n");
        scanf("%d", &partida);

        switch(partida){
            case 1 :
                strcpy(NomedoAeroP, "GUARULHOS");
                break;
            case 2 :
                strcpy(NomedoAeroP, "PANAMÁ");
                break;
            case 3 :
                strcpy(NomedoAeroP, "ATLANTA");
                break;
            case 4 :
                strcpy(NomedoAeroP, "JOANESBURGO");
                break;
            case 5 :
                strcpy(NomedoAeroP, "DUBAI");
                break;
            case 6 :
                strcpy(NomedoAeroP, "LONDRES");
                break;
            case 7 :
                strcpy(NomedoAeroP, "SYDNEY");
                break;
            case 8 :
                strcpy(NomedoAeroP, "TÓQUIO");
                break;
            case 9 :
                strcpy(NomedoAeroP, "MOSCOU");
                break;
            default :
                printf("Digite um Número válido\n");
                goto Pergunta1;
        }
        Pergunta2:
        printf("\nO voo tem destino para qual aeroporto? Números validos são de 1 a 9\n");
        scanf("%d", &destino);

        switch(destino){
            case 1:
                strcpy(NomedoAeroD, "GUARULHOS");
                break;
            case 2:
                strcpy(NomedoAeroD, "PANAMÁ");
                break;
            case 3:
                strcpy(NomedoAeroD, "ATLANTA");
                break;
            case 4:
                strcpy(NomedoAeroD, "JOANESBURGO");
                break;
            case 5:
                strcpy(NomedoAeroD, "DUBAI");
                break;
            case 6:
                strcpy(NomedoAeroD, "LONDRES");
                break;
            case 7:
                strcpy(NomedoAeroD, "SYDNEY");
                break;
            case 8:
                strcpy(NomedoAeroD, "TÓQUIO");
                break;
            case 9:
                strcpy(NomedoAeroD, "MOSCOU");
                break;
            default:
                printf("Digite um Número válido\n");
                goto Pergunta2;

        }
        TempoVoo = dijkstra(grafo,destino-1);
        printf("\nPartindo-se do aeroporto de %s com destino ao aeroporto de %s, o menor tempo de voo possível é de %d horas \n", NomedoAeroP,NomedoAeroD, TempoVoo[partida-1]);

        char verlista[2];
        printf("\nDeseja ver a lista de adjacência do grafo? S ou N\n");
        scanf("%s", verlista);
            if(verlista == 'S' || 's')
                MostraListaAdj(grafo);
            return(0);
    }

Grafo *criaGrafo(int vertices){

    Grafo *grafo = (Grafo *) malloc(sizeof(Grafo));
    grafo->numVertices = vertices;
    grafo->aresta = (Vertice *) malloc(vertices*sizeof(Vertice));
    int i;
        for(i = 0; i< vertices; i++)
        grafo->aresta[i].PrimeiroVertice = NULL;

    return(grafo);
}

Lista *criaLista(int vFinal, int pesos){

    Lista *no = (Lista *)malloc(sizeof(Lista));
    no->vertice = vFinal;
    no->pesos = pesos;
    no->proximo = NULL;
    return(no);
}
int geraAresta(Grafo *grafo, int vertInicial, int vertFinal, int pesos){

    Lista *novaAresta = criaLista(vertFinal, pesos);
    novaAresta->proximo = grafo->aresta[vertInicial].PrimeiroVertice;
    grafo->aresta[vertInicial].PrimeiroVertice = novaAresta;
    novaAresta = criaLista(vertInicial, pesos);
    novaAresta->proximo = grafo->aresta[vertFinal].PrimeiroVertice;
    grafo->aresta[vertFinal].PrimeiroVertice = novaAresta;

    return(1);
}

void MostraListaAdj(Grafo *grafo){

    int i;
        printf("\nLista de Adjacência do grafo:  \n");
        for(i = 0;i < grafo->numVertices; i++){
            Lista *ListaAd  = grafo->aresta[i].PrimeiroVertice;
            printf("Vértice %d  ",i+1);
            while(ListaAd){
                printf("--> %d com peso (%d) ", ListaAd->vertice+1,ListaAd->pesos);
                ListaAd = ListaAd->proximo;
            }
            printf("\n");
        }
}

void SomaArestas(Grafo *grafo, int *Distancia, int PVertice, int ProxVertice){

    Lista *listaAd = grafo->aresta[PVertice].PrimeiroVertice;
    while(listaAd && listaAd->vertice != ProxVertice)
        listaAd = listaAd->proximo;
    if(listaAd){
    if(Distancia[ProxVertice] > Distancia[PVertice] + listaAd->pesos){
        Distancia[ProxVertice] = Distancia[PVertice] + listaAd->pesos;
        }
    }
}

int *dijkstra(Grafo *grafo,int Inicial){

    int *Distancia = (int *)malloc(grafo->numVertices*sizeof(int));
    int aberto[grafo->numVertices];
    int i;
        for(i = 0; i < grafo->numVertices; i++){
            Distancia[i] = INT_MAX;
        }
        Distancia[Inicial] = 0;

    int j;
        for(j = 0; j< grafo->numVertices; j++)
        aberto[j] = 1;

    while(VerificaAberto(grafo, aberto)){
        int u = menorDistancia(grafo,aberto, Distancia);
        aberto[u] = 0;
        Lista *listaAd = grafo->aresta[u].PrimeiroVertice;
        while(listaAd){
            SomaArestas(grafo,Distancia, u , listaAd->vertice);
            listaAd = listaAd->proximo;
        }
    }
    return(Distancia);
}
int VerificaAberto(Grafo *grafo, int *aberto){

    int i;
        for(i = 0; i< grafo->numVertices; i++)
            if(aberto[i])
                return (1);
            else
                return (0);
}

int menorDistancia(Grafo *grafo, int *aberto, int *Distancia){

    int i;
    for(i = 0; i < grafo->numVertices; i++){
        if(aberto[i])
        break;
    }
    if(i == grafo->numVertices)
        return (-1);
    int menor = i;
    for(i = menor+1; i< grafo->numVertices; i++)
        if(aberto[i] && (Distancia[menor]>Distancia[i]))
            menor = i;
        return(menor);
}


