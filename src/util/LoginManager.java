import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginManager {
	private String username;
	private String password;
	private String returnString;
	public LoginManager(String username, String password) {
		this.username = username;
		this.password = password;
		returnString = null;
	}
	public String authenticate() {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/events?user=root&password=root&useSSL=false");
			ps = conn.prepareStatement("SELECT u.UserID, u.Username FROM User u WHERE username=? AND password=?");
			ps.setString(1, username);
			ps.setString(2, password);
			rs = ps.executeQuery();
			while(rs.next()) {
				returnString = rs.getString("UserID") + "," + rs.getString("Username"); 
			}
		} catch(SQLException sqle) {
			System.out.println(sqle.getMessage());
		} catch (ClassNotFoundException e) {
			System.out.println(e.getMessage());
		}
		finally {
			try {
				if(rs != null)
					rs.close();
				if(ps != null)
					ps.close();
				if(conn != null)
					conn.close();
			}
			catch(SQLException sqle) {
				System.out.println(sqle.getMessage());
			}
		}
		return returnString;
	}
	public static void main (String args[]) {
		LoginManager lm = new LoginManager("Miles", "Phan");
		System.out.println(lm.authenticate());
	}
}
