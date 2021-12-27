#Python Program for DAG Implementation onto previous BT code

class Node:

    #New Constructor for Successor/Pre Value
    def __init__(self,val) -> None:
        self.successor = []
        self.predecessor = []
        self.value = val
    
#Class for DAG implementation
def dagBT(root, x, y):
    if root == None:
        return None
    if root.value == x.value or root.value == y.value:
        return root.value
    if x.value == y.value:
        return x.value
    LCA = []
    for count in range(len(x.predecessor)):
        for count2 in range(len(y.predecessor)):
            if(x.predecessor[count].value == y.predecessor[count2].value):
                LCA.append(x.predecessor[count].value)
    if(LCA==[]):
        if(x.value > y.value):
            LCA.append(dagBT(root, x.predecessor[0], y))
        else:
           LCA.append(dagBT(root, x, y.predecessor[0]))

    return max(LCA)