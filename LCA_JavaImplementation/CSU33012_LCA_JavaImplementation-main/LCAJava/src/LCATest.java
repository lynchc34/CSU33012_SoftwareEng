import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import static org.junit.Assert.assertEquals;


public class LCATest {

	@Test
	public void testEmpty(){
	    //test empty tree
	    LCA tree = new LCA();
	    assertEquals("Empty Tree",-1,tree.findLCA(tree.root,0,0));
	}
	
	@Test
	public void testLCABT(){
	    //Test BT is formed and LCA on given tree
	    LCA tree = new LCA();
	    tree.root = new Node(1);
	    tree.root.left = new Node(2);
	    tree.root.right = new Node(3);
	    tree.root.left.left = new Node(4);
	    tree.root.left.right = new Node(5);
	    tree.root.right.left = new Node(6);
	    tree.root.right.right = new Node(7);

	    assertEquals("1,2,3,4,5,6,7",1,tree.findLCA(tree.root,2,3));
	}
	
    @Test
    public void testFindLCA() {
    	//Test LCA can be found in given BT
		LCA tree = new LCA();
		
		assertEquals(-1, tree.findLCA(tree.root,4,5));
		
		tree.root = new Node(1);
		tree.root.left = new Node(2);
		tree.root.right = new Node(3);
		tree.root.left.left = new Node(4);
		tree.root.left.right = new Node(5);
		tree.root.right.left = new Node(6);
		tree.root.right.right = new Node(7);

        assertEquals(2, tree.findLCA(tree.root,4,5));
        assertEquals(1, tree.findLCA(tree.root,4,6));
        assertEquals(-1, tree.findLCA(tree.root,13,12));
        assertEquals(-1, tree.findLCA(tree.root,2,12));
        assertEquals(-1, tree.findLCA(tree.root,12,2));
    }
}

