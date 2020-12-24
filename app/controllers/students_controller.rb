class StudentsController < ApplicationController

  def validate_students
    @users = params[:users]
    @current_students = Student.where(torre_username: @users )
    
    if !@current_students.empty?
      @current_students.update_all(organization: params[:organization])
    end
    
    @current_students = @current_students.map(&:torre_username)
    @students = @users - @current_students

    @new_students = @students.map{|user| {torre_username: user, organization: params[:organization], created_at: DateTime.now, updated_at: DateTime.now}}
    unless @new_students.empty?
      Student.insert_all(@new_students)
      system "rake get_users_genome USERNAMES=#{@students.join(',')} &"
      render json: {status: 200, message: 'Processing'} and return
    end
    
    render json: {status: 200, message: 'Updated'} and return
  end
end