#Python Program for LCA in a Binary Tree
class Node:
     
    #New Binary Node Constructor
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
     
def findLCA(root, node1, node2):
     
    #Base Case
    if root is None:
        return None
 
    if root.key == node1 or root.key == node2:
        return root
 
    #Look for keys in left and right subtrees
    left_lca = findLCA(root.left, node1, node2)
    right_lca = findLCA(root.right, node1, node2)
 
    if left_lca and right_lca:
        return root
 
    #Else check if left subtree or right subtree is LCA
    return left_lca if left_lca is not None else right_lca
 
#Binary Tree Creation as Driver Program
root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)
root.right.left = Node(6)
root.right.right = Node(7)
