//Java Program for LCA in a Binary Tree
import java.util.ArrayList;
import java.util.List;
 
//Binary Tree node
class Node {
    int data;
    Node left, right;
 
    Node(int value) {
        data = value;
        right = null;
        left = null;
    }
}
 
public class LCA
{
 
    Node root;
    private List<Integer> path1 = new ArrayList<>();
    private List<Integer> path2 = new ArrayList<>();
 
    // Finds the path from root node to given root of the tree.
    int findLCA(Node root, int n1, int n2) {
        path1.clear();
        path2.clear();
        if (!findPath(root, n1, path1) || !findPath(root, n2, path2)) {
        	return -1;
        }
        int count = 0;
        while (count < path1.size()&& count < path2.size()) {
        	if (!path1.get(count).equals(path2.get(count))) break;
        	count +=1;
        }
        return path1.get(count-1);
    }
 
    //Finds path from node root to given node of BT, stores in path[], returns true if path exists else false
    boolean findPath(Node root, int n, List<Integer> path)
    {
        //base case
        if (root == null) {
            return false;
        }
        // Store the node  
        path.add(root.data);
        if (root.data == n) {
            return true;
        }
        if (root.left != null && findPath(root.left, n, path)) {
            return true;
        }
        if (root.right != null && findPath(root.right, n, path)) {
            return true;
        }
        //Remove root from path[] if not present, return false
        path.remove(path.size()-1);
        return false;
    }
 
    //Test BT is being created
    public static void main(String[] args)
    {
        LCA tree = new LCA();
        tree.root = new Node(1);
        tree.root.left = new Node(2);
        tree.root.right = new Node(3);
        tree.root.left.left = new Node(4);
        tree.root.left.right = new Node(5);
        tree.root.right.left = new Node(6);
        tree.root.right.right = new Node(7);
 
        System.out.println("LCA(1, 2): " + tree.findLCA(tree.root, 1, 2));
        System.out.println("LCA(2, 3): " + tree.findLCA(tree.root, 2, 3));
        System.out.println("LCA(4, 5): " + tree.findLCA(tree.root, 4,5));
        System.out.println("LCA(6, 7): " + tree.findLCA(tree.root, 6, 7));
      
     
    }
}